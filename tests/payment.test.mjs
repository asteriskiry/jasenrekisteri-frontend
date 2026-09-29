import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeResponse } from '../src/utils/responses.js';
import { pollPaymentStatus } from '../src/components/member/payment/paymentStatus.js';

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
