import {registerPlugin} from '@capacitor/core';
import {AttributionProvider, UserPropertyKey} from "../dto/enums";
import {IntroEligibility} from "../dto/IntroEligibility";
import Mapper, {QEntitlement, QPurchaseResult} from "./Mapper";
import {PurchaseResult} from '../dto/PurchaseResult';
import {Offerings} from "../dto/Offerings";
import {Entitlement} from "../dto/Entitlement";
import {Product} from "../dto/Product";
import {isAndroid, isIos} from "./utils";
import {EntitlementsUpdateListener} from '../dto/EntitlementsUpdateListener';
import {DeferredPurchasesListener} from '../dto/DeferredPurchasesListener';
import {PromoPurchasesListener} from '../dto/PromoPurchasesListener';
import {User} from '../dto/User';
import {PurchaseOptions} from '../dto/PurchaseOptions'
import {QonversionConfig} from '../QonversionConfig';
import {RemoteConfig} from "../dto/RemoteConfig";
import {UserProperties} from '../dto/UserProperties';
import {RemoteConfigList} from '../dto/RemoteConfigList';
import {QonversionApi} from '../QonversionApi';
import {QonversionNativePlugin} from '../QonversionNativePlugin';
import {PurchaseOptionsBuilder} from '../dto/PurchaseOptionsBuilder';
import {SKProductDiscount} from '../dto/storeProducts/SKProductDiscount';
import {PromotionalOffer} from '../dto/PromotionalOffer';

export const sdkVersion = "1.7.0";
export const sdkSource = "capacitor";

const entitlementsUpdatedEvent = 'entitlementsUpdatedEvent';
const deferredPurchaseCompletedEvent = 'deferredPurchaseCompletedEvent';
const promoPurchaseEvent = 'shouldPurchasePromoProductEvent';

const QonversionNative = registerPlugin<QonversionNativePlugin>('Qonversion', {
  web: () => import('./web').then(m => new m.QonversionWeb()),
});

export default class QonversionInternal implements QonversionApi {

  private entitlementsUpdateListener: EntitlementsUpdateListener | null = null;
  private deferredPurchasesListener: DeferredPurchasesListener | null = null;
  private entitlementsEventSubscribed = false;
  private deferredPurchaseEventSubscribed = false;

  constructor(qonversionConfig: QonversionConfig) {
    QonversionNative.storeSdkInfo({source: sdkSource, version: sdkVersion});
    QonversionNative.initialize({
      projectKey: qonversionConfig.projectKey,
      launchMode: qonversionConfig.launchMode,
      environment: qonversionConfig.environment,
      entitlementsCacheLifetime: qonversionConfig.entitlementsCacheLifetime,
      proxyUrl: qonversionConfig.proxyUrl,
      kidsMode: qonversionConfig.kidsMode
    });

    if (qonversionConfig.entitlementsUpdateListener) {
      this.setEntitlementsUpdateListener(qonversionConfig.entitlementsUpdateListener);
    }

    if (qonversionConfig.deferredPurchasesListener) {
      this.setDeferredPurchasesListener(qonversionConfig.deferredPurchasesListener);
    }
  }

  syncHistoricalData() {
    QonversionNative.syncHistoricalData();
  }

  syncStoreKit2Purchases() {
    if (isIos()) {
      QonversionNative.syncStoreKit2Purchases();
    }
  }

  async getPromotionalOffer(product: Product, discount: SKProductDiscount): Promise<PromotionalOffer | null> {
    if (isAndroid()) {
      return null;
    }

    const promoOffer = await QonversionNative.getPromotionalOffer({
      productId: product.qonversionId,
      discountId: discount.identifier,
    });
    const mappedPromoOffer: PromotionalOffer | null = Mapper.convertPromoOffer(promoOffer);

    return mappedPromoOffer;
  }

  async purchase(product: Product, options?: PurchaseOptions): Promise<PurchaseResult> {
    if (!options) {
      options = new PurchaseOptionsBuilder().build();
    }

    const promoOffer = {
      productDiscountId: options.promotionalOffer?.productDiscount.identifier,
      keyIdentifier: options.promotionalOffer?.paymentDiscount.keyIdentifier,
      nonce: options.promotionalOffer?.paymentDiscount.nonce,
      signature: options.promotionalOffer?.paymentDiscount.signature,
      timestamp: options.promotionalOffer?.paymentDiscount.timestamp
    };

    let purchaseResult: QPurchaseResult;
    if (isIos()) {
      purchaseResult = await QonversionNative.purchase({
        productId: product.qonversionId,
        quantity: options.quantity,
        contextKeys: options.contextKeys,
        promoOffer: promoOffer
      });
    } else {
      purchaseResult = await QonversionNative.purchase({
        productId: product.qonversionId,
        offerId: options.offerId,
        applyOffer: options.applyOffer,
        oldProductId: options.oldProduct?.qonversionId,
        updatePolicyKey: options.updatePolicy,
        contextKeys: options.contextKeys
      });
    }

    const mappedPurchaseResult = Mapper.convertPurchaseResult(purchaseResult);

    if (!mappedPurchaseResult) {
      throw new Error('Failed to process purchase result');
    }

    return mappedPurchaseResult;
  }

  async products(): Promise<Map<string, Product>> {
    let products = await QonversionNative.products();
    const mappedProducts: Map<string, Product> = Mapper.convertProducts(
      products
    );

    return mappedProducts;
  }

  /**
   * @deprecated Offerings are deprecated. Manage paywall products with Remote Configs instead: https://documentation.qonversion.io/docs/migrate-offerings-to-remote-configs
   */
  async offerings(): Promise<Offerings | null> {
    let offerings = await QonversionNative.offerings();
    const mappedOfferings = Mapper.convertOfferings(offerings);

    return mappedOfferings;
  }

  async checkTrialIntroEligibility(
    ids: string[]
  ): Promise<Map<string, IntroEligibility>> {
    const eligibilityInfo = await QonversionNative.checkTrialIntroEligibility({ids});

    const mappedEligibility: Map<
      string,
      IntroEligibility
    > = Mapper.convertEligibility(eligibilityInfo);

    return mappedEligibility;
  }

  async checkEntitlements(): Promise<Map<string, Entitlement>> {
    const entitlements = await QonversionNative.checkEntitlements();
    const mappedPermissions: Map<
      string,
      Entitlement
    > = Mapper.convertEntitlements(entitlements);

    return mappedPermissions;
  }

  async restore(): Promise<Map<string, Entitlement>> {
    const entitlements = await QonversionNative.restore();

    const mappedPermissions: Map<
      string,
      Entitlement
    > = Mapper.convertEntitlements(entitlements);

    return mappedPermissions;
  }

  syncPurchases() {
    if (!isAndroid()) {
      return;
    }

    QonversionNative.syncPurchases();
  }

  async identify(userId: string): Promise<User> {
    const userInfo = await QonversionNative.identify({userId: userId});
    const mappedUserInfo: User = Mapper.convertUserInfo(userInfo);

    return mappedUserInfo;
  }

  logout() {
    QonversionNative.logout();
  }

  async userInfo(): Promise<User> {
    const info = await QonversionNative.userInfo();
    const mappedUserInfo: User = Mapper.convertUserInfo(info);

    return mappedUserInfo;
  }

  async forceSendProperties(): Promise<void> {
    await QonversionNative.forceSendProperties();
  }


  collectAdvertisingId() {
    if (isIos()) {
      QonversionNative.collectAdvertisingId();
    }
  }

  collectAppleSearchAdsAttribution() {
    if (isIos()) {
      QonversionNative.collectAppleSearchAdsAttribution();
    }
  }

  setEntitlementsUpdateListener(listener: EntitlementsUpdateListener) {
    this.subscribeToEntitlementsUpdatedEvent();
    this.entitlementsUpdateListener = listener;
  }

  setDeferredPurchasesListener(listener: DeferredPurchasesListener) {
    this.subscribeToDeferredPurchaseEvent();
    this.deferredPurchasesListener = listener;
  }

  private subscribeToEntitlementsUpdatedEvent() {
    if (this.entitlementsEventSubscribed) {
      return;
    }
    QonversionNative.addListener(entitlementsUpdatedEvent, this.entitlementsUpdatedEventHandler);
    this.entitlementsEventSubscribed = true;
  }

  private subscribeToDeferredPurchaseEvent() {
    if (this.deferredPurchaseEventSubscribed) {
      return;
    }
    QonversionNative.addListener(deferredPurchaseCompletedEvent, this.deferredPurchaseCompletedEventHandler);
    this.deferredPurchaseEventSubscribed = true;
  }

  private entitlementsUpdatedEventHandler = (payload: Record<string, QEntitlement> | null | undefined) => {
    const entitlements = Mapper.convertEntitlements(payload);
    this.entitlementsUpdateListener?.onEntitlementsUpdated(entitlements);
  };

  private deferredPurchaseCompletedEventHandler = (payload: QPurchaseResult | null | undefined) => {
    const purchaseResult = Mapper.convertPurchaseResult(payload);
    if (purchaseResult) {
      this.deferredPurchasesListener?.onDeferredPurchaseCompleted(purchaseResult);
    }
  };

  setPromoPurchasesDelegate(delegate: PromoPurchasesListener) {
    if (!isIos()) {
      return;
    }

    QonversionNative.addListener(promoPurchaseEvent, (payload: {productId: string}) => {
      const promoPurchaseExecutor = async () => {
        const entitlements = await QonversionNative.promoPurchase({productId: payload.productId});
        const mappedPermissions: Map<string, Entitlement> = Mapper.convertEntitlements(entitlements);
        return mappedPermissions;
      };
      delegate.onPromoPurchaseReceived(payload.productId, promoPurchaseExecutor);
    });
  }

  presentCodeRedemptionSheet() {
    if (isIos()) {
      QonversionNative.presentCodeRedemptionSheet();
    }
  }

  async remoteConfig(contextKey: string | undefined): Promise<RemoteConfig> {
    const remoteConfig = await QonversionNative.remoteConfig({contextKey});
    const mappedRemoteConfig: RemoteConfig = Mapper.convertRemoteConfig(remoteConfig);

    return mappedRemoteConfig;
  }

  async remoteConfigList(): Promise<RemoteConfigList> {
    const remoteConfigList = await QonversionNative.remoteConfigList();
    const mappedRemoteConfigList: RemoteConfigList = Mapper.convertRemoteConfigList(remoteConfigList);

    return mappedRemoteConfigList;
  }

  async remoteConfigListForContextKeys(contextKeys: string[], includeEmptyContextKey: boolean): Promise<RemoteConfigList> {
    const remoteConfigList = await QonversionNative.remoteConfigList({contextKeys, includeEmptyContextKey});
    const mappedRemoteConfigList: RemoteConfigList = Mapper.convertRemoteConfigList(remoteConfigList);

    return mappedRemoteConfigList;
  }

  async attachUserToExperiment(experimentId: string, groupId: string): Promise<void> {
    await QonversionNative.attachUserToExperiment({experimentId, groupId});
    return;
  }

  async detachUserFromExperiment(experimentId: string): Promise<void> {
    await QonversionNative.detachUserFromExperiment({experimentId});
    return;
  }

  async attachUserToRemoteConfiguration(remoteConfigurationId: string): Promise<void> {
    await QonversionNative.attachUserToRemoteConfiguration({remoteConfigurationId});
    return;
  }

  async detachUserFromRemoteConfiguration(remoteConfigurationId: string): Promise<void> {
    await QonversionNative.detachUserFromRemoteConfiguration({remoteConfigurationId});
    return;
  }

  async isFallbackFileAccessible(): Promise<Boolean> {
    const isAccessibleResult = await QonversionNative.isFallbackFileAccessible();

    return isAccessibleResult.success;
  }

  attribution(data: Object, provider: AttributionProvider) {
    QonversionNative.addAttributionData({data, provider});
  }

  setUserProperty(property: UserPropertyKey, value: string) {
    if (property === UserPropertyKey.CUSTOM) {
      console.warn("Can not set user property with the key `UserPropertyKey.CUSTOM`. " +
        "To set custom user property, use the `setCustomUserProperty` method.");
      return;
    }

    QonversionNative.setDefinedUserProperty({property, value});
  }

  setCustomUserProperty(property: string, value: string) {
    QonversionNative.setCustomUserProperty({property, value});
  }

  async userProperties(): Promise<UserProperties> {
    const properties = await QonversionNative.userProperties();
    const mappedUserProperties: UserProperties = Mapper.convertUserProperties(properties);

    return mappedUserProperties;
  }
}
