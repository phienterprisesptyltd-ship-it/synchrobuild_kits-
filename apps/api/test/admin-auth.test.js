import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakePocketbaseCtor } from '../fixtures/fake-pocketbase-package.js';

const VALID_TOKEN = 'valid-admin-token';
const ADMIN_RECORD = { id: 'admin_1', email: 'admin@synchrobuild.com.au', name: 'Admin' };

// Mocked once for the whole file, before admin-auth.js is imported, so the
// module never touches the real `pocketbase` package or a live server.
// admin-auth.js also pulls POCKETBASE_HOST from utils/pocketbaseClient.js -
// importing that named export still evaluates the whole real module (which
// eagerly connects to PocketBase), so it must be mocked too.
mock.module('pocketbase', {
  exports: { default: createFakePocketbaseCtor({ [VALID_TOKEN]: ADMIN_RECORD }) },
});
mock.module('../src/utils/pocketbaseClient.js', {
  exports: { default: {}, POCKETBASE_HOST: 'http://fake-pocketbase.test' },
});

const { adminAuthMiddleware } = await import('../src/middleware/admin-auth.js');

function fakeReqRes(authHeader) {
  const req = { headers: authHeader ? { authorization: authHeader } : {} };
  const res = {
    statusCode: null,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return { req, res };
}

test('adminAuthMiddleware rejects requests with no Authorization header', async () => {
  const { req, res } = fakeReqRes(undefined);
  let nextCalled = false;

  await adminAuthMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(req.admin, undefined);
});

test('adminAuthMiddleware rejects an invalid/unrecognized bearer token', async () => {
  const { req, res } = fakeReqRes('Bearer not-a-real-token');
  let nextCalled = false;

  await adminAuthMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(req.admin, undefined);
});

test('adminAuthMiddleware accepts a valid admin token and attaches req.admin', async () => {
  const { req, res } = fakeReqRes(`Bearer ${VALID_TOKEN}`);
  let nextCalled = false;

  await adminAuthMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(res.statusCode, null); // middleware never touched the response
  assert.deepEqual(req.admin, ADMIN_RECORD);
});
