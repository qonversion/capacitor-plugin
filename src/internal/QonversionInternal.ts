import {WebPlugin} from '@capacitor/core';
import {AttributionProvider, QonversionErrorCode, UserPropertyKey} from "../dto/enums";
import {IntroEligibility} from "../dto/IntroEligibility";
import Mapper, {QEntitlement} from "./Mapper";
import {Offerings} from "../dto/Offerings";
import {Entitlement} from "../dto/Entitlement";
import {Product} from "../dto/Product";
import {isAndroid, isIos} from "./utils";
import {EntitlementsUpdateListener} from '../dto/EntitlementsUpdateListener';
import {PromoPurchasesListener} from '../dto/PromoPurchasesListener';
import {User} from '../dto/User';
import {PurchaseOptions} from '../dto/PurchaseOptions'
import {QonversionConfig} from '../QonversionConfig';
import {RemoteConfig} from "../dto/RemoteConfig";
import {UserProperties} from '../dto/UserProperties';
import {PurchaseModel} from '../dto/PurchaseModel';
import {PurchaseUpdateModel} from '../dto/PurchaseUpdateModel';
import {RemoteConfigList} from '../dto/RemoteConfigList';
import { QonversionPlugin } from '../definitions';
// import { Qonversion } from 'qonversion-capacitor';
import { Plugins } from '@capacitor/core';

const { QonversionNative } = Plugins;
// const sdkVersion = "0.0.1";

// const EVENT_ENTITLEMENTS_UPDATED = "entitlements_updated";
// const EVENT_PROMO_PURCHASE_RECEIVED = "promo_purchase_received";

// const QonversionNative = registerPlugin<QonversionPlugin>('Qonversion');

export default class QonversionInternal extends WebPlugin implements QonversionPlugin {

  constructor(qonversionConfig: QonversionConfig) {
    super ();


    if (qonversionConfig.entitlementsUpdateListener) {
      this.setEntitlementsUpdateListener(qonversionConfig.entitlementsUpdateListener);
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

  async isFallbackFileAccessible(): Promise<Boolean> {
    const isAccessibleResult = await QonversionNative.isFallbackFileAccessible();

    return isAccessibleResult.success;
  }

  async purchaseProduct(product: Product, options: PurchaseOptions): Promise<Map<string, Entitlement>> {
    try {
      let purchasePromise: Promise<Record<string, QEntitlement> | null | undefined>;
      if (isIos()) {
        purchasePromise = QonversionNative.purchase(product.qonversionID, options.quantity, options.contextKeys);
      } else {
        purchasePromise = QonversionNative.purchase(
            product.qonversionID,
            options.offerId,
            options.applyOffer,
            options.oldProduct?.qonversionID,
            options.updatePolicy,
            options.contextKeys
        );
      }
      const entitlements = await purchasePromise;

      // noinspection UnnecessaryLocalVariableJS
      const mappedPermissions = Mapper.convertEntitlements(entitlements);

      return mappedPermissions;
    } catch (e) {
      e.userCanceled = e.code === QonversionErrorCode.PURCHASE_CANCELED;
      throw e;
    }
  }

  async purchase(purchaseModel: PurchaseModel): Promise<Map<string, Entitlement>> {
    try {
      let purchasePromise: Promise<Record<string, QEntitlement> | null | undefined>;
      if (isIos()) {
        purchasePromise = QonversionNative.purchase(purchaseModel.productId, 1, null);
      } else {
        purchasePromise = QonversionNative.purchase(
          purchaseModel.productId,
          purchaseModel.offerId,
          purchaseModel.applyOffer,
          null,
          null,
          null
        );
      }
      const entitlements = await purchasePromise;

      // noinspection UnnecessaryLocalVariableJS
      const mappedPermissions = Mapper.convertEntitlements(entitlements);

      return mappedPermissions;
    } catch (e) {
      e.userCanceled = e.code === QonversionErrorCode.PURCHASE_CANCELED;
      throw e;
    }
  }

  async updatePurchase(purchaseUpdateModel: PurchaseUpdateModel): Promise<Map<string, Entitlement> | null> {
    if (!isAndroid()) {
      return null;
    }

    try {
      const entitlements = await QonversionNative.updatePurchase(
        purchaseUpdateModel.productId,
        purchaseUpdateModel.offerId,
        purchaseUpdateModel.applyOffer,
        purchaseUpdateModel.oldProductId,
        purchaseUpdateModel.updatePolicy,
        null
      );

      // noinspection UnnecessaryLocalVariableJS
      const mappedPermissions: Map<string, Entitlement> = Mapper.convertEntitlements(entitlements);

      return mappedPermissions;
    } catch (e) {
      e.userCanceled = e.code === QonversionErrorCode.PURCHASE_CANCELED;
      throw e;
    }
  }

  async products(): Promise<Map<string, Product>> {
    let products = await QonversionNative.products();
    const mappedProducts: Map<string, Product> = Mapper.convertProducts(
      products
    );

    return mappedProducts;
  }

  async offerings(): Promise<Offerings | null> {
    let offerings = await QonversionNative.offerings();
    const mappedOfferings = Mapper.convertOfferings(offerings);

    return mappedOfferings;
  }

  async checkTrialIntroEligibility(
    ids: string[]
  ): Promise<Map<string, IntroEligibility>> {
    const eligibilityInfo = await QonversionNative.checkTrialIntroEligibilityForProductIds(ids);

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

  async identify(userID: string): Promise<User> {
    const userInfo = await QonversionNative.identify(userID);
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

  attribution(data: Object, provider: AttributionProvider) {
    QonversionNative.addAttributionData(data, provider);
  }

  setUserProperty(property: UserPropertyKey, value: string) {
    if (property === UserPropertyKey.CUSTOM) {
      console.warn("Can not set user property with the key `UserPropertyKey.CUSTOM`. " +
        "To set custom user property, use the `setCustomUserProperty` method.");
      return;
    }

    QonversionNative.setDefinedProperty(property, value);
  }

  setCustomUserProperty(property: string, value: string) {
    QonversionNative.setCustomProperty(property, value);
  }

  async userProperties(): Promise<UserProperties> {
    const properties = await QonversionNative.userProperties();
    const mappedUserProperties: UserProperties = Mapper.convertUserProperties(properties);

    return mappedUserProperties;
  }

  collectAdvertisingId() {
    if (isIos()) {
      QonversionNative.collectAdvertisingID();
    }
  }

  collectAppleSearchAdsAttribution() {
    if (isIos()) {
      QonversionNative.collectAppleSearchAdsAttribution();
    }
  }

  setEntitlementsUpdateListener(listener: EntitlementsUpdateListener) {
    // const eventEmitter = new NativeEventEmitter(RNQonversion);
    // eventEmitter.removeAllListeners(EVENT_ENTITLEMENTS_UPDATED);
    // eventEmitter.addListener(EVENT_ENTITLEMENTS_UPDATED, payload => {
    //   const entitlements = Mapper.convertEntitlements(payload);
    //   listener.onEntitlementsUpdated(entitlements);
    // });
  }

  setPromoPurchasesDelegate(delegate: PromoPurchasesListener) {
    if (!isIos()) {
      return;
    }

    // const eventEmitter = new NativeEventEmitter(RNQonversion);
    // eventEmitter.removeAllListeners(EVENT_PROMO_PURCHASE_RECEIVED);
    // eventEmitter.addListener(EVENT_PROMO_PURCHASE_RECEIVED, productId => {
    //   const promoPurchaseExecutor = async () => {
    //     const entitlements = await QonversionNative.promoPurchase(productId);
    //     const mappedPermissions: Map<string, Entitlement> = Mapper.convertEntitlements(entitlements);
    //     return mappedPermissions;
    //   };
    //   delegate.onPromoPurchaseReceived(productId, promoPurchaseExecutor);
    // });
  }

  presentCodeRedemptionSheet() {
    if (isIos()) {
      QonversionNative.presentCodeRedemptionSheet();
    }
  }

  async remoteConfig(contextKey: string | undefined): Promise<RemoteConfig> {
    const remoteConfig = await QonversionNative.remoteConfig(contextKey);
    const mappedRemoteConfig: RemoteConfig = Mapper.convertRemoteConfig(remoteConfig);

    return mappedRemoteConfig;
  }

  async remoteConfigList(): Promise<RemoteConfigList> {
    const remoteConfigList = await QonversionNative.remoteConfigList();
    const mappedRemoteConfigList: RemoteConfigList = Mapper.convertRemoteConfigList(remoteConfigList);

    return mappedRemoteConfigList;
  }

  async remoteConfigListForContextKeys(contextKeys: string[], includeEmptyContextKey: boolean): Promise<RemoteConfigList> {
    const remoteConfigList = await QonversionNative.remoteConfigListForContextKeys(contextKeys, includeEmptyContextKey);
    const mappedRemoteConfigList: RemoteConfigList = Mapper.convertRemoteConfigList(remoteConfigList);

    return mappedRemoteConfigList;
  }

  async attachUserToExperiment(experimentId: string, groupId: string): Promise<void> {
    await QonversionNative.attachUserToExperiment(experimentId, groupId);
    return;
  }

  async detachUserFromExperiment(experimentId: string): Promise<void> {
    await QonversionNative.detachUserFromExperiment(experimentId);
    return;
  }

  async attachUserToRemoteConfiguration(remoteConfigurationId: string): Promise<void> {
    await QonversionNative.attachUserToRemoteConfiguration(remoteConfigurationId);
    return;
  }

  async detachUserFromRemoteConfiguration(remoteConfigurationId: string): Promise<void> {
    await QonversionNative.detachUserFromRemoteConfiguration(remoteConfigurationId);
    return;
  }
}
