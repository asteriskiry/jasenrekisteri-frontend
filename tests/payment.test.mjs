import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeResponse } from '../src/utils/responses.js';
import {
  fetchPaymentStatus,
  pollPaymentStatus,
} from '../src/components/member/payment/paymentStatus.js';

test('lost tab storage still checks the payment using browser cookies', async () => {
  const states = [{ state: 'pending' }, { state: 'complete' }];
  const api = {
    async get(path, options) {
      assert.equal(path, '/pay/session-status');
      assert.deepEqual(options.params, { session_id: 'cs_test_return' });
      assert.equal(options.withCredentials, true);
      return { data: states.shift() };
    },
  };
  const result = await pollPaymentStatus(
    () => fetchPaymentStatus(api, 'cs_test_return', null),
    { wait: async () => {} }
  );
  assert.equal(result.state, 'complete');
  assert.equal(states.length, 0);
});

test('missing receipt access retains the existing message and network failures remain retryable', async () => {
  const expected = {
    state: 'error',
    message:
      'Avaa maksun tiedot samassa selaimessa, jossa aloitit maksun. Saat kuitin sähköpostiisi.',
  };
  assert.deepEqual(await fetchPaymentStatus(null, null), expected);
  for (const code of ['INVALID_PAYMENT', 'PAYMENT_NOT_FOUND']) {
    const api = {
      get: async () => {
        throw { response: { data: { error: { code } } } };
      },
    };
    assert.deepEqual(await fetchPaymentStatus(api, 'cs_test_return'), expected);
  }
  const failure = new Error('Network unavailable');
  await assert.rejects(
    fetchPaymentStatus(
      {
        get: async () => {
          throw failure;
        },
      },
      'cs_test_return'
    ),
    failure
  );
});

test('available tab stamp and cancellation signal are preserved', async () => {
  const controller = new AbortController();
  const api = {
    async get(path, options) {
      assert.deepEqual(options.params, {
        session_id: 'cs_test_return',
        stamp: 'private-stamp',
      });
      assert.equal(options.signal, controller.signal);
      return { data: { state: 'complete' } };
    },
  };
  assert.equal(
    (
      await fetchPaymentStatus(
        api,
        'cs_test_return',
        'private-stamp',
        controller.signal
      )
    ).state,
    'complete'
  );
});

test('API envelopes support registration, checkout and existing login consumers', () => {
  const data = {
    memberId: 'member',
    paymentToken: 'scoped-token',
    url: 'https://checkout.stripe.com/test',
    stamp: 'stamp',
  };
  const result = normalizeResponse({ success: true, message: 'ok', data });
  assert.equal(result.paymentToken, data.paymentToken);
  assert.equal(result.url, data.url);
  assert.deepEqual(result.data, data);
  assert.deepEqual(normalizeResponse([{ firstName: 'Test' }]), [
    { firstName: 'Test' },
  ]);
  assert.deepEqual(normalizeResponse({ firstName: 'Test' }), {
    firstName: 'Test',
  });
});

test('return page waits for webhook fulfillment without treating pending as success', async () => {
  const states = [
    { state: 'pending' },
    { state: 'pending' },
    { state: 'complete', paymentData: { amount: 500 } },
  ];
  let waits = 0;
  const result = await pollPaymentStatus(async () => states.shift(), {
    wait: async () => {
      waits += 1;
    },
  });
  assert.equal(result.state, 'complete');
  assert.equal(waits, 2);
});

test('delayed payments time out with a pending state and can be checked again', async () => {
  let calls = 0;
  const result = await pollPaymentStatus(
    async () => {
      calls += 1;
      return { state: 'pending' };
    },
    { attempts: 3, wait: async () => {} }
  );
  assert.equal(result.state, 'pending');
  assert.equal(calls, 3);
});

test('failed and review payments stop polling; leaving the page stops further requests', async () => {
  for (const state of ['failed', 'expired', 'review']) {
    assert.equal(
      (await pollPaymentStatus(async () => ({ state }))).state,
      state
    );
  }
  const controller = new AbortController();
  let calls = 0;
  await pollPaymentStatus(
    async () => {
      calls += 1;
      return { state: 'pending' };
    },
    {
      signal: controller.signal,
      wait: async () => controller.abort(),
    }
  );
  assert.equal(calls, 1);
});
