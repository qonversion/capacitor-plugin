type AddListenerCall = {event: string; handler: (...args: any[]) => void};

const addListenerCalls: AddListenerCall[] = [];
const nativePluginStub = {
  storeSdkInfo: jest.fn(),
  initialize: jest.fn(),
  addListener: jest.fn((event: string, handler: (...args: any[]) => void) => {
    addListenerCalls.push({event, handler});
  }),
};

jest.mock('@capacitor/core', () => ({
  registerPlugin: jest.fn(() => nativePluginStub),
}));

import {EntitlementsCacheLifetime, Environment, LaunchMode, PurchaseResultSource, PurchaseResultStatus} from '../../dto/enums';
import {QonversionConfig} from '../../QonversionConfig';
import QonversionInternal from '../QonversionInternal';
import type {EntitlementsUpdateListener} from '../../dto/EntitlementsUpdateListener';
import type {DeferredPurchasesListener} from '../../dto/DeferredPurchasesListener';

const ENTITLEMENTS_EVENT = 'entitlementsUpdatedEvent';
const DEFERRED_PURCHASE_EVENT = 'deferredPurchaseCompletedEvent';

function buildConfig(): QonversionConfig {
  return new QonversionConfig(
    'projectKey',
    LaunchMode.SUBSCRIPTION_MANAGEMENT,
    Environment.SANDBOX,
    EntitlementsCacheLifetime.MONTH,
    undefined,
    undefined,
    undefined,
    false,
  );
}

function callsForEvent(event: string): AddListenerCall[] {
  return addListenerCalls.filter(call => call.event === event);
}

beforeEach(() => {
  addListenerCalls.length = 0;
  nativePluginStub.storeSdkInfo.mockClear();
  nativePluginStub.initialize.mockClear();
  nativePluginStub.addListener.mockClear();
});

describe('setDeferredPurchasesListener', () => {
  it('subscribes to deferredPurchaseCompletedEvent only once across multiple set calls', () => {
    const internal = new QonversionInternal(buildConfig());

    const first: DeferredPurchasesListener = {onDeferredPurchaseCompleted: jest.fn()};
    const second: DeferredPurchasesListener = {onDeferredPurchaseCompleted: jest.fn()};
    const third: DeferredPurchasesListener = {onDeferredPurchaseCompleted: jest.fn()};

    internal.setDeferredPurchasesListener(first);
    internal.setDeferredPurchasesListener(second);
    internal.setDeferredPurchasesListener(third);

    expect(callsForEvent(DEFERRED_PURCHASE_EVENT)).toHaveLength(1);
  });

  it('replaces previous listener so only the latest receives events', () => {
    const internal = new QonversionInternal(buildConfig());

    const first: DeferredPurchasesListener = {onDeferredPurchaseCompleted: jest.fn()};
    const second: DeferredPurchasesListener = {onDeferredPurchaseCompleted: jest.fn()};

    internal.setDeferredPurchasesListener(first);
    internal.setDeferredPurchasesListener(second);

    const subscriptions = callsForEvent(DEFERRED_PURCHASE_EVENT);
    expect(subscriptions).toHaveLength(1);

    subscriptions[0].handler({
      status: 'Success',
      entitlements: {},
      source: 'Api',
      isFallbackGenerated: false,
    });

    expect(first.onDeferredPurchaseCompleted).not.toHaveBeenCalled();
    expect(second.onDeferredPurchaseCompleted).toHaveBeenCalledTimes(1);

    const purchaseResult = (second.onDeferredPurchaseCompleted as jest.Mock).mock.calls[0][0];
    expect(purchaseResult.status).toBe(PurchaseResultStatus.SUCCESS);
    expect(purchaseResult.source).toBe(PurchaseResultSource.API);
  });

});

describe('setEntitlementsUpdateListener', () => {
  it('subscribes to entitlementsUpdatedEvent only once across multiple set calls', () => {
    const internal = new QonversionInternal(buildConfig());

    const first: EntitlementsUpdateListener = {onEntitlementsUpdated: jest.fn()};
    const second: EntitlementsUpdateListener = {onEntitlementsUpdated: jest.fn()};
    const third: EntitlementsUpdateListener = {onEntitlementsUpdated: jest.fn()};

    internal.setEntitlementsUpdateListener(first);
    internal.setEntitlementsUpdateListener(second);
    internal.setEntitlementsUpdateListener(third);

    expect(callsForEvent(ENTITLEMENTS_EVENT)).toHaveLength(1);
  });

  it('replaces previous listener so only the latest receives events', () => {
    const internal = new QonversionInternal(buildConfig());

    const first: EntitlementsUpdateListener = {onEntitlementsUpdated: jest.fn()};
    const second: EntitlementsUpdateListener = {onEntitlementsUpdated: jest.fn()};

    internal.setEntitlementsUpdateListener(first);
    internal.setEntitlementsUpdateListener(second);

    const subscriptions = callsForEvent(ENTITLEMENTS_EVENT);
    expect(subscriptions).toHaveLength(1);

    subscriptions[0].handler({});

    expect(first.onEntitlementsUpdated).not.toHaveBeenCalled();
    expect(second.onEntitlementsUpdated).toHaveBeenCalledTimes(1);
    expect((second.onEntitlementsUpdated as jest.Mock).mock.calls[0][0]).toBeInstanceOf(Map);
  });
});
