// Stands in for apps/api's shared, superuser-authenticated PocketBase client
// (utils/pocketbaseClient.js). Keeps chat_messages/chat_sessions in memory so
// route tests never touch a real PocketBase instance or real data.
let nextId = 1;

function makeId() {
  return `test_${nextId++}`;
}

function notFound() {
  const error = new Error("The requested resource wasn't found.");
  error.status = 404;
  return error;
}

export function createFakePbClient() {
  const messages = [];
  const sessions = new Map(); // keyed by sessionId

  const client = {
    collection(name) {
      if (name === 'chat_messages') {
        return {
          create: async (data) => {
            const record = { id: makeId(), ...data };
            messages.push(record);
            return record;
          },
          getList: async (page, perPage, { filter } = {}) => {
            let items = messages;
            const match = /sessionId="([^"]+)"/.exec(filter || '');

            if (match) {
              items = items.filter((m) => m.sessionId === match[1]);
            }

            return { page, perPage, totalItems: items.length, items };
          },
        };
      }

      if (name === 'chat_sessions') {
        return {
          getOne: async (sessionId) => {
            const record = sessions.get(sessionId);

            if (!record) {
              throw notFound();
            }

            return record;
          },
          create: async (data) => {
            const record = { id: makeId(), ...data };
            sessions.set(data.sessionId, record);
            return record;
          },
          update: async (sessionId, data) => {
            const existing = sessions.get(sessionId);

            if (!existing) {
              throw notFound();
            }

            const record = { ...existing, ...data };
            sessions.set(sessionId, record);
            return record;
          },
          getList: async (page, perPage) => {
            const items = [...sessions.values()];
            return { page, perPage, totalItems: items.length, items };
          },
        };
      }

      throw new Error(`FakePbClient: unexpected collection "${name}"`);
    },
  };

  return { client, messages, sessions };
}
