// Stands in for the `pocketbase` npm package. admin-auth.js constructs a
// fresh instance per request (`new Pocketbase(host)`), saves the caller's
// bearer token into authStore, then calls `collection('admins').authRefresh()`
// exactly like the real SDK does when validating a token against the server.
//
// `tokenToRecord` simulates PocketBase's own signature/expiry check: only
// tokens present in the map "verify"; anything else (missing, garbage,
// well-formed-but-unknown) rejects, the same way a forged or expired token
// would be rejected by the real auth-refresh endpoint.
export function createFakePocketbaseCtor(tokenToRecord = {}) {
  return class FakePocketbase {
    constructor(host) {
      this.host = host;
      this._token = null;
      this.authStore = {
        save: (token) => {
          this._token = token;
        },
        clear: () => {
          this._token = null;
        },
      };
    }

    collection(name) {
      if (name !== 'admins') {
        throw new Error(`FakePocketbase: unexpected collection "${name}"`);
      }

      return {
        authRefresh: async () => {
          const record = tokenToRecord[this._token];

          if (!record) {
            const error = new Error('The request requires valid record authorization token.');
            error.status = 401;
            throw error;
          }

          return { record, token: this._token };
        },
      };
    }
  };
}
