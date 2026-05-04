import {EntitlementsCacheLifetime, Environment, LaunchMode} from './dto/enums';
import {EntitlementsUpdateListener} from './dto/EntitlementsUpdateListener';
import {DeferredPurchasesListener} from './dto/DeferredPurchasesListener';

export class QonversionConfig {
  readonly projectKey: string;
  readonly launchMode: LaunchMode;
  readonly environment: Environment;
  readonly entitlementsCacheLifetime: EntitlementsCacheLifetime;
  /** @deprecated Use {@link deferredPurchasesListener} instead. */
  readonly entitlementsUpdateListener: EntitlementsUpdateListener | undefined;
  readonly deferredPurchasesListener: DeferredPurchasesListener | undefined;
  readonly proxyUrl: string | undefined;
  readonly kidsMode: boolean;

  constructor(
    projectKey: string,
    launchMode: LaunchMode,
    environment: Environment = Environment.PRODUCTION,
    entitlementsCacheLifetime: EntitlementsCacheLifetime = EntitlementsCacheLifetime.MONTH,
    entitlementsUpdateListener: EntitlementsUpdateListener | undefined = undefined,
    deferredPurchasesListener: DeferredPurchasesListener | undefined = undefined,
    proxyUrl: string | undefined,
    kidsMode: boolean = false,
  ) {
    this.projectKey = projectKey;
    this.launchMode = launchMode;
    this.environment = environment;
    this.entitlementsCacheLifetime = entitlementsCacheLifetime;
    this.entitlementsUpdateListener = entitlementsUpdateListener;
    this.deferredPurchasesListener = deferredPurchasesListener;
    this.proxyUrl = proxyUrl;
    this.kidsMode = kidsMode;
  }
}
