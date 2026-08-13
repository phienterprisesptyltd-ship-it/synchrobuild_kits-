import { test, before, after, mock } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createFakePocketbaseCtor } from '../fixtures/fake-pocketbase-package.js';
import { createFakePbClient } from '../fixtures/fake-pb-client.js';

const VALID_ADMIN_TOKEN = 'valid-admin-token';
const ADMIN_RECORD = { id: 'admin_1', email: 'admin@synchrobuild.com.au', name: 'Admin' };

// Mocked once for the whole file, before chat.js (and the admin-auth
// middleware it uses) is imported. Neither the real PocketBase npm package
// nor the shared superuser-authenticated pocketbaseClient is ever touched -
// everything runs against in-memory fakes, so no real/production data is
// read or written by these tests.
mock.module('pocketbase', {
  exports: { default: createFakePocketbaseCtor({ [VALID_ADMIN_TOKEN]: ADMIN_RECORD }) },
});

const { client: fakePb, messages } = createFakePbClient();
mock.module('../src/utils/pocketbaseClient.js', {
  exports: { default: fakePb, POCKETBASE_HOST: 'http://fake-pocketbase.test' },
});

const { default: chatRouter } = await import('../src/routes/chat.js');

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

// --- 5. Public customer chat flow must keep working without admin auth ---

test('public: a customer can post a chat message without any auth', async () => {
  const sessionId = 'session-public-post';

  const res = await fetch(`${baseUrl}/chat/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message: 'Hi, I have a question', senderType: 'customer' }),
  });

  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);
  assert.ok(body.messageId);
});

test('public: a customer can fetch their own session messages without any auth', async () => {
  const sessionId = 'session-public-get';

  await fetch(`${baseUrl}/chat/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message: 'Hello there', senderType: 'customer' }),
  });

  const res = await fetch(`${baseUrl}/chat/messages?sessionId=${sessionId}`);

  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  assert.equal(body.length, 1);
  assert.equal(body[0].message, 'Hello there');
});

// --- 4. GET /chat/messages without sessionId must never expose all sessions ---

test('GET /chat/messages without sessionId is rejected, not a session dump', async () => {
  const res = await fetch(`${baseUrl}/chat/messages`);

  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(!('sessions' in body));
  assert.ok(!Array.isArray(body));
});

// --- 1 & 2. POST /chat/admin/messages must reject unauthenticated / invalid callers ---

test('POST /chat/admin/messages rejects a request with no Authorization header', async () => {
  const sessionId = 'session-admin-noauth';
  const before = messages.length;

  const res = await fetch(`${baseUrl}/chat/admin/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message: 'I am definitely support staff' }),
  });

  assert.equal(res.status, 401);
  assert.equal(messages.length, before, 'no message should have been written');
});

test('POST /chat/admin/messages rejects an invalid bearer token', async () => {
  const sessionId = 'session-admin-badtoken';
  const before = messages.length;

  const res = await fetch(`${baseUrl}/chat/admin/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer this-is-a-forged-token',
    },
    body: JSON.stringify({ sessionId, message: 'I am definitely support staff' }),
  });

  assert.equal(res.status, 401);
  assert.equal(messages.length, before, 'no message should have been written');
});

// --- 3. A real, valid admin can send an admin chat message ---

test('POST /chat/admin/messages succeeds for a valid admin token', async () => {
  const sessionId = 'session-admin-valid';

  // A customer opens the conversation first, as would happen for real.
  await fetch(`${baseUrl}/chat/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message: 'Customer question', senderType: 'customer' }),
  });

  const res = await fetch(`${baseUrl}/chat/admin/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VALID_ADMIN_TOKEN}`,
    },
    body: JSON.stringify({ sessionId, message: 'Admin reply' }),
  });

  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);

  const stored = messages.find((m) => m.id === body.messageId);
  assert.equal(stored.senderType, 'admin');
  assert.equal(stored.sessionId, sessionId);
  assert.equal(stored.message, 'Admin reply');
});

// --- 6. GET /chat/admin/sessions requires valid admin auth ---

test('GET /chat/admin/sessions rejects unauthenticated requests', async () => {
  const res = await fetch(`${baseUrl}/chat/admin/sessions`);
  assert.equal(res.status, 401);
});

test('GET /chat/admin/sessions rejects an invalid bearer token', async () => {
  const res = await fetch(`${baseUrl}/chat/admin/sessions`, {
    headers: { Authorization: 'Bearer this-is-a-forged-token' },
  });
  assert.equal(res.status, 401);
});

test('GET /chat/admin/sessions succeeds for a valid admin token', async () => {
  const res = await fetch(`${baseUrl}/chat/admin/sessions`, {
    headers: { Authorization: `Bearer ${VALID_ADMIN_TOKEN}` },
  });

  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.sessions));
  assert.ok(body.sessions.length > 0);
});
