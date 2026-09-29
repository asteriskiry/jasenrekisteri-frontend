import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSessionStore } from '../src/utils/sessionStore.js';

const user = () => ({
  id: 'member-id',
  role: 'Member',
  expiresAt: new Date(Date.now() + 3600000).toISOString(),
});
const response = (data = user()) => ({ data: { success: true, data } });
function harness(api) {
  let expire;
  return {
    store: createSessionStore(api, {
      setTimeout: (callback) => {
        expire = callback;
      },
      clearTimeout: () => {},
    }),
    expire: () => expire(),
  };
}

test('reload restores server session metadata without retaining token or password fields', async () => {
  const data = {
    ...user(),
    token: 'must-not-retain',
    password: 'must-not-retain',
  };
  const { store } = harness({
    get: async (path) => {
      assert.equal(path, '/session');
      return response(data);
    },
  });
  assert.equal(store.getSnapshot().loading, true);
  await store.refresh();
  assert.deepEqual(store.getSnapshot(), {
    user: { id: data.id, role: data.role, expiresAt: data.expiresAt },
    loading: false,
    error: null,
  });
});

test('login submits credentials and session expiry clears protected UI state', async () => {
  const { store, expire } = harness({
    post: async (path, credentials) => {
      assert.equal(path, '/login');
      assert.deepEqual(credentials, {
        email: 'member@example.test',
        password: 'password',
      });
      return response();
    },
  });
  await store.login({ email: 'member@example.test', password: 'password' });
  assert.equal(store.getSnapshot().user.id, 'member-id');
  expire();
  assert.equal(store.getSnapshot().user, null);
});

test('an expired session response is not accepted', async () => {
  const { store } = harness({
    get: async () =>
      response({ ...user(), expiresAt: new Date(0).toISOString() }),
  });
  await store.refresh();
  assert.equal(store.getSnapshot().user, null);
  assert.equal(store.getSnapshot().loading, false);
});

test('401 clears session state; a server failure remains distinguishable and retryable', async () => {
  let status;
  const { store } = harness({
    get: async () => {
      if (status) throw { response: { status } };
      return response();
    },
  });
  await store.refresh();
  status = 503;
  await store.refresh();
  assert.ok(store.getSnapshot().error);
  status = undefined;
  await store.refresh();
  assert.equal(store.getSnapshot().error, null);
  status = 401;
  await store.refresh();
  assert.deepEqual(store.getSnapshot(), {
    user: null,
    loading: false,
    error: null,
  });
});

test('logout waits for server revocation and failure leaves a retryable session', async () => {
  let fail = true;
  const { store } = harness({
    get: async () => response(),
    post: async (path) => {
      assert.equal(path, '/logout');
      if (fail) throw new Error('Network unavailable');
    },
  });
  await store.refresh();
  await assert.rejects(store.logout(), /Network unavailable/);
  assert.equal(store.getSnapshot().user.id, 'member-id');
  fail = false;
  await store.logout();
  assert.equal(store.getSnapshot().user, null);
});

test('an old session check cannot restore a user after logout', async () => {
  let resolve;
  const { store } = harness({
    get: () =>
      new Promise((done) => {
        resolve = done;
      }),
    post: async () => {},
  });
  const pending = store.refresh();
  await store.logout();
  resolve(response());
  await pending;
  assert.equal(store.getSnapshot().user, null);
});

test('focus refresh cannot race a login, and a previous identity response is ignored', async () => {
  let resolve, finishLogin;
  const { store } = harness({
    get: () =>
      new Promise((done) => {
        resolve = done;
      }),
    post: () =>
      new Promise((done) => {
        finishLogin = done;
      }),
  });
  const pending = store.refresh();
  const login = store.login({});
  await store.refresh();
  finishLogin(response());
  await login;
  resolve(response({ ...user(), id: 'previous-user' }));
  await pending;
  assert.equal(store.getSnapshot().user.id, 'member-id');
});
