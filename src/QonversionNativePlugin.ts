import {
  QEntitlement,
  QOfferings,
  QProduct,
  QRemoteConfig,
  QRemoteConfigList,
  QTrialIntroEligibility,
  QUser, QUserProperties
} from './internal/Mapper';

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

  checkEntitlements(): Promise<Record<string, QEntitlement> | null | undefined>;

  storeSdkInfo(params: {source: string, version: string}): void;

  purchase(params: {
    productId: string,
    quantity?: number,
    contextKeys: string[] | null,
    offerId?: string | null | undefined,
    applyOffer?: boolean | undefined,
    oldProductId?: string | undefined,
    updatePolicyKey?: string | null | undefined,
  }): Promise<Record<string, QEntitlement> | null | undefined>;

  products(): Promise<Record<string, QProduct> | null | undefined>;

  offerings(): Promise<QOfferings | null | undefined>;

  checkTrialIntroEligibility(params: {ids: string[]}): Promise<QTrialIntroEligibility | null | undefined>;

  restore(): Promise<Record<string, QEntitlement> | null | undefined>;

  syncPurchases(): void;

  identify(params: {userId: string}): Promise<QUser>;

  logout(): void;

  userInfo(): Promise<QUser>;

  remoteConfig(params: {contextKey: string | undefined}): Promise<QRemoteConfig>;

  remoteConfigList(params?: {contextKeys: string[], includeEmptyContextKey: boolean}): Promise<QRemoteConfigList>;

  attachUserToExperiment(params: {experimentId: string, groupId: string}): Promise<void>;

  detachUserFromExperiment(params: {experimentId: string}): Promise<void>;

  attachUserToRemoteConfiguration(params: {remoteConfigurationId: string}): Promise<void>;

  detachUserFromRemoteConfiguration(params: {remoteConfigurationId: string}): Promise<void>;

  isFallbackFileAccessible(): Promise<{success: boolean}>;

  addAttributionData(params: {data: Object, provider: string}): void;

  setDefinedUserProperty(param: {property: string, value: string}): void;

  setCustomUserProperty(param: {property: string, value: string}): void;

  userProperties(): Promise<QUserProperties>;

  collectAdvertisingId(): void;

  collectAppleSearchAdsAttribution(): void;

  presentCodeRedemptionSheet(): void;

  promoPurchase(params: { productId: string }): Promise<Record<string, QEntitlement> | null | undefined>;

  addListener(event: 'entitlementsUpdatedEvent', listener: (payload: (Record<string, QEntitlement> | null | undefined)) => void): void;

  addListener(event: 'shouldPurchasePromoProductEvent', listener: (payload: {productId: string}) => void): void;
}
