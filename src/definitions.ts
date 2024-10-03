import {
  AttributionProvider,
  UserPropertyKey
} from './dto/enums';
import {IntroEligibility} from './dto/IntroEligibility';
import {Offerings} from './dto/Offerings';
import {Product} from './dto/Product';
import {User} from './dto/User';
import {UserProperties} from './dto/UserProperties';
import {RemoteConfig} from './dto/RemoteConfig';
import {RemoteConfigList} from './dto/RemoteConfigList';
import {PurchaseModel} from './dto/PurchaseModel';
import {PurchaseUpdateModel} from './dto/PurchaseUpdateModel';
import {PurchaseOptions} from './dto/PurchaseOptions';
import {Entitlement} from './dto/Entitlement';
import {EntitlementsUpdateListener} from './dto/EntitlementsUpdateListener';
import {PromoPurchasesListener} from './dto/PromoPurchasesListener';

export interface QonversionPlugin {
  /**
   * Call this function to sync the subscriber data with the first launch when Qonversion is implemented.
   */
  syncHistoricalData(): void;

  /**
   * iOS only
   * Contact us before you start using this function
   * Call this function to sync purchases if you are using StoreKit2 and our SDK in Analytics mode.
   */
  syncStoreKit2Purchases(): void;

  /**
   * Make a purchase and validate it through server-to-server using Qonversion's Backend
   * @param product product to purchase
   * @param options additional options for the purchase process.
   * @returns the promise with the user entitlements including the ones obtained by the purchase
   *
   * @see [Making Purchases](https://documentation.qonversion.io/docs/making-purchases)
   */
  purchaseProduct(product: Product, options: PurchaseOptions): Promise<Map<string, Entitlement>>

  /**
   * Make a purchase and validate it through server-to-server using Qonversion's Backend.
   *
   * @deprecated Use {@link purchaseProduct} function instead.
   * @param purchaseModel necessary information for purchase
   * @returns the promise with the user entitlements including the ones obtained by the purchase
   * @see [Making Purchases](https://documentation.qonversion.io/docs/making-purchases)
   */
  purchase(purchaseModel: PurchaseModel): Promise<Map<string, Entitlement>>;

  /**
   * Android only. Returns `null` if called on iOS.
   *
   * Update (upgrade/downgrade) subscription on Google Play Store and validate it through server-to-server using Qonversion's Backend.
   *
   * @deprecated Use {@link purchaseProduct} function instead.
   * @param purchaseUpdateModel necessary information for purchase update
   * @returns the promise with the user entitlements including updated ones.
   * @see [Update policy](https://developer.android.com/google/play/billing/subscriptions#replacement-modes)
   * @see [Making Purchases](https://documentation.qonversion.io/docs/making-purchases)
   */
  updatePurchase(purchaseUpdateModel: PurchaseUpdateModel): Promise<Map<string, Entitlement> | null>;

  /**
   * Returns Qonversion products in association with Apple and Google Play Store Products.
   *
   * @returns the promise with Qonversion products
   */
  products(): Promise<Map<string, Product>>;

  /**
   * Return Qonversion Offerings Object.
   *
   * An offering is a group of products that you can offer to a user on a given paywall based on your business logic.
   * For example, you can offer one set of products on a paywall immediately after onboarding and another
   * set of products with discounts later on if a user has not converted.
   * Offerings allow changing the products offered remotely without releasing app updates.
   *
   * @returns the promise with Qonversion offerings
   *
   * @see [Offerings](https://qonversion.io/docs/offerings) for more details
   */
  offerings(): Promise<Offerings | null>;

  /**
   * You can check if a user is eligible for an introductory offer, including a free trial.
   * You can show only a regular price for users who are not eligible for an introductory offer.
   *
   * @param ids products identifiers that must be checked
   * @returns the promise with eligibility map
   */
  checkTrialIntroEligibility(ids: string[]): Promise<Map<string, IntroEligibility>>;

  /**
   * You need to call the checkEntitlements method to check if a user has the required entitlement.
   *
   * This method will check the user receipt and will return the current entitlements.
   *
   * @returns the promise with the entitlements
   *
   * If Apple or Google servers are not responding at the time of the request, Qonversion provides the latest
   * entitlements' data from its database.
   */
  checkEntitlements(): Promise<Map<string, Entitlement>>;

  /**
   * Restores users purchases in your app, to maintain access to purchased content.
   * Users sometimes need to restore purchased content, such as when they upgrade to a new phone.
   *
   * @returns the promise with the user entitlements
   */
  restore(): Promise<Map<string, Entitlement>>;

  /**
   * Android only. Does nothing if called on iOS.
   *
   * This method will send all purchases to the Qonversion backend. Call this every time when purchase is handled
   * by your own implementation.
   *
   * **Warning!**
   *
   * This method works for Android only.
   * It should only be called if you're using Qonversion SDK in observer mode.
   *
   * @see [Observer mode for Android SDK](https://documentation.qonversion.io/docs/observer-mode#android-sdk)
   */
  syncPurchases(): void;

  /**
   * Call this function to link a user to his unique ID in your system and share purchase data.
   *
   * @param userID unique user ID in your system
   * @returns the promise with the information about the identified user.
   */
  identify(userID: string): Promise<User>;

  /**
   * Call this function to unlink a user from his unique ID in your system and his purchase data.
   */
  logout(): void;

  /**
   * This method returns information about the current Qonversion user.
   * @returns the promise with the information about the user.
   */
  userInfo(): Promise<User>;

  /**
   * Returns Qonversion remote config object by {@link contextKey} or default one if the key is not specified.
   * Use this function to get the remote config with specific payload and experiment info.
   * @returns the promise with the remote config.
   */
  remoteConfig(contextKey: string | undefined): Promise<RemoteConfig>

  /**
   * Returns Qonversion remote config objects for all existing context key (including empty one).
   * Use this function to get the remote config with specific payload and experiment info.
   * @returns the promise with the remote config list.
   */
  remoteConfigList(): Promise<RemoteConfigList>

  /**
   * Returns Qonversion remote config objects by a list of {@link contextKeys}.
   * Use this function to get the remote config with specific payload and experiment info.
   * @param contextKeys list of context keys to load remote configs for
   * @param includeEmptyContextKey set to true if you want to include remote config with empty context key to the result
   * @returns the promise with the remote config list.
   */
  remoteConfigListForContextKeys(contextKeys: Array<string>, includeEmptyContextKey: boolean): Promise<RemoteConfigList>

  /**
   * This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
   * Use this function to attach the user to the experiment.
   * @param experimentId identifier of the experiment
   * @param groupId identifier of the experiment group
   * @returns the promise for success result or throws an error otherwise.
   */
  attachUserToExperiment(experimentId: string, groupId: string): Promise<void>

  /**
   * This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
   * Use this function to detach the user from the experiment.
   * @param experimentId identifier of the experiment
   * @returns the promise for success result or throws an error otherwise.
   */
  detachUserFromExperiment(experimentId: string): Promise<void>

  /**
   * This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
   * Use this function to attach the user to the remote configuration.
   * @param remoteConfigurationId identifier of the remote configuration
   * @returns the promise for success result or throws an error otherwise.
   */
  attachUserToRemoteConfiguration(remoteConfigurationId: string): Promise<void>

  /**
   * This function should be used for the test purposes only. Do not forget to delete the usage of this function before the release.
   * Use this function to detach the user from the remote configuration.
   * @param remoteConfigurationId identifier of the remote configuration
   * @returns the promise for success result or throws an error otherwise.
   */
  detachUserFromRemoteConfiguration(remoteConfigurationId: string): Promise<void>

  /**
   * Call this function to check if the fallback file is accessible.
   * @returns the promise with the flag that indicates whether Qonversion was able to read data from the fallback file or not.
   */
  isFallbackFileAccessible(): Promise<Boolean>;

  /**
   * Sends your attribution {@link data} to the {@link provider}.
   *
   * @param data an object containing your attribution data
   * @param provider the provider to which the data will be sent
   */
  attribution(data: Object, provider: AttributionProvider): void;

  /**
   * Sets Qonversion reserved user properties, like email or user id
   *
   * User properties are attributes you can set on a user level.
   * You can send user properties to third party platforms as well as use them in Qonversion for customer segmentation
   * and analytics.
   *
   * Note that using {@link UserPropertyKey.CUSTOM} here will do nothing.
   * To set custom user property, use {@link setCustomUserProperty} method instead.
   *
   * @param key defined enum key that will be transformed to string.
   * @param value property value.
   *
   * @see [documentation](https://documentation.qonversion.io/docs/user-properties)
   */
  setUserProperty(key: UserPropertyKey, value: string): void;

  /**
   * Adds custom user property.
   *
   * User properties are attributes you can set on a user level.
   * You can send user properties to third party platforms as well as use them in Qonversion for customer segmentation
   * and analytics.
   *
   * @param key custom user property key.
   * @param value property value.
   *
   * @see [documentation](https://documentation.qonversion.io/docs/user-properties)
   */
  setCustomUserProperty(key: string, value: string): void;

  /**
   * This method returns all the properties, set for the current Qonversion user.
   * All set properties are sent to the server with delay, so if you call
   * this function right after setting some property, it may not be included
   * in the result.
   * @returns the promise with the user properties
   */
  userProperties(): Promise<UserProperties>;

  /**
   * Provide a listener to be notified about asynchronous user entitlements updates.
   *
   * Make sure you provide this listener for being up-to-date with the user entitlements.
   * Else you can lose some important updates. Also, please, consider that this listener
   * should live for the whole lifetime of the application.
   *
   * You may set entitlements listener both *after* Qonversion SDK initializing
   * with {@link QonversionApi.setEntitlementsUpdateListener} and *while* Qonversion initializing
   * with {@link Qonversion.initialize}.
   *
   * @param listener listener to be called when entitlements update
   */
  setEntitlementsUpdateListener(listener: EntitlementsUpdateListener): void;

  /**
   * iOS only. Does nothing if called on Android.
   *
   * On iOS 14.5+, after requesting the app tracking permission using ATT, you need to notify Qonversion if tracking
   * is allowed and IDFA is available.
   */
  collectAdvertisingId(): void;

  /**
   * iOS only. Does nothing if called on Android.
   *
   * Enable attribution collection from Apple Search Ads.
   */
  collectAppleSearchAdsAttribution(): void;

  /**
   * iOS only. Does nothing if called on Android.
   *
   * Set the delegate to handle promo purchases.
   * The delegate is called when a promo purchase from the App Store happens.
   * @param delegate delegate to be called when event happens.
   */
  setPromoPurchasesDelegate(delegate: PromoPurchasesListener): void;

  /**
   * iOS only. Does nothing if called on Android.
   *
   * On iOS 14.0+ shows up a sheet for users to redeem App Store offer codes.
   */
  presentCodeRedemptionSheet(): void;
}

export * from './dto/enums';
export * from './dto/Entitlement';
export * from './dto/IntroEligibility';
export * from './dto/Offering';
export * from './dto/Offerings';
export * from './dto/Product';
export * from './dto/QonversionError';
export * from './dto/User';
export * from './dto/UserProperty';
export * from './dto/UserProperties';
export * from './QonversionConfig';
export * from './QonversionConfigBuilder';
export * from './dto/Experiment';
export * from './dto/Transaction';
export * from './dto/RemoteConfig';
export * from './dto/RemoteConfigList';
export * from './dto/RemoteConfigurationSource';
export * from './dto/ExperimentGroup';
export * from './dto/SubscriptionPeriod';
export * from './dto/storeProducts/ProductInAppDetails';
export * from './dto/storeProducts/ProductInstallmentPlanDetails';
export * from './dto/storeProducts/ProductOfferDetails';
export * from './dto/storeProducts/ProductPrice';
export * from './dto/storeProducts/ProductPricingPhase';
export * from './dto/storeProducts/ProductStoreDetails';
export * from './dto/PurchaseModel';
export * from './dto/PurchaseUpdateModel';
export * from './dto/PurchaseOptions';
export * from './dto/PurchaseOptionsBuilder';
export * from './dto/EntitlementsUpdateListener';
export * from './dto/PromoPurchasesListener';
export * from './dto/storeProducts/SKProduct';
export * from './dto/storeProducts/SKProductDiscount';
export * from './dto/storeProducts/SKSubscriptionPeriod';
export * from './dto/storeProducts/SkuDetails';
export * from './dto/ActionResult';
