import {QEntitlement} from './internal/Mapper';

export interface QonversionNativePlugin {
  initialize(params: {
    projectKey: string,
    launchMode: string,
    environment: string,
    entitlementsCacheLifetime: string,
    proxyUrl: string | undefined,
    kidsMode: boolean
  }): void;

  syncHistoricalData(): void;

  syncStoreKit2Purchases(): void;

  isFallbackFileAccessible(): Promise<{success: boolean}>;

  checkEntitlements(): Promise<Record<string, QEntitlement> | null | undefined>;

  storeSdkInfo(params: {source: string, version: string}): void;
}
