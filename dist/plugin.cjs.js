'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

exports.LaunchMode = void 0;
(function (LaunchMode) {
    LaunchMode["ANALYTICS"] = "Analytics";
    LaunchMode["SUBSCRIPTION_MANAGEMENT"] = "SubscriptionManagement";
})(exports.LaunchMode || (exports.LaunchMode = {}));
exports.Environment = void 0;
(function (Environment) {
    Environment["SANDBOX"] = "Sandbox";
    Environment["PRODUCTION"] = "Production";
})(exports.Environment || (exports.Environment = {}));
exports.ProductType = void 0;
(function (ProductType) {
    ProductType["TRIAL"] = "Trial";
    ProductType["INTRO"] = "Intro";
    ProductType["SUBSCRIPTION"] = "Subscription";
    ProductType["IN_APP"] = "InApp";
    ProductType["UNKNOWN"] = "Unknown";
})(exports.ProductType || (exports.ProductType = {}));
exports.SubscriptionPeriodUnit = void 0;
(function (SubscriptionPeriodUnit) {
    SubscriptionPeriodUnit["DAY"] = "Day";
    SubscriptionPeriodUnit["WEEK"] = "Week";
    SubscriptionPeriodUnit["MONTH"] = "Month";
    SubscriptionPeriodUnit["YEAR"] = "Year";
    SubscriptionPeriodUnit["UNKNOWN"] = "Unknown";
})(exports.SubscriptionPeriodUnit || (exports.SubscriptionPeriodUnit = {}));
/**
 * Recurrence mode of the pricing phase.
 */
exports.PricingPhaseRecurrenceMode = void 0;
(function (PricingPhaseRecurrenceMode) {
    /**
     * The billing plan payment recurs for infinite billing periods unless canceled.
     */
    PricingPhaseRecurrenceMode["INFINITE_RECURRING"] = "InfiniteRecurring";
    /**
     * The billing plan payment recurs for a fixed number of billing periods
     * set in {@link ProductPricingPhase.billingCycleCount}.
     */
    PricingPhaseRecurrenceMode["FINITE_RECURRING"] = "FiniteRecurring";
    /**
     * The billing plan payment is a one-time charge that does not repeat.
     */
    PricingPhaseRecurrenceMode["NON_RECURRING"] = "NonRecurring";
    /**
     * Unknown recurrence mode.
     */
    PricingPhaseRecurrenceMode["UNKNOWN"] = "Unknown";
})(exports.PricingPhaseRecurrenceMode || (exports.PricingPhaseRecurrenceMode = {}));
/**
 * Type of the pricing phase.
 */
exports.PricingPhaseType = void 0;
(function (PricingPhaseType) {
    /**
     * Regular subscription without any discounts like trial or intro offers.
     */
    PricingPhaseType["REGULAR"] = "Regular";
    /**
     * A free phase.
     */
    PricingPhaseType["FREE_TRIAL"] = "FreeTrial";
    /**
     * A phase with a discounted payment for a single period.
     */
    PricingPhaseType["DISCOUNTED_SINGLE_PAYMENT"] = "DiscountedSinglePayment";
    /**
     * A phase with a discounted payment for several periods, described in {@link ProductPricingPhase.billingCycleCount}.
     */
    PricingPhaseType["DISCOUNTED_RECURRING_PAYMENT"] = "DiscountedRecurringPayment";
    /**
     * Unknown pricing phase type.
     */
    PricingPhaseType["UNKNOWN"] = "Unknown";
})(exports.PricingPhaseType || (exports.PricingPhaseType = {}));
exports.EntitlementRenewState = void 0;
(function (EntitlementRenewState) {
    EntitlementRenewState["NON_RENEWABLE"] = "non_renewable";
    EntitlementRenewState["UNKNOWN"] = "unknown";
    EntitlementRenewState["WILL_RENEW"] = "will_renew";
    EntitlementRenewState["CANCELED"] = "canceled";
    EntitlementRenewState["BILLING_ISSUE"] = "billing_issue";
})(exports.EntitlementRenewState || (exports.EntitlementRenewState = {}));
exports.EntitlementSource = void 0;
(function (EntitlementSource) {
    EntitlementSource["UNKNOWN"] = "Unknown";
    EntitlementSource["APP_STORE"] = "AppStore";
    EntitlementSource["PLAY_STORE"] = "PlayStore";
    EntitlementSource["STRIPE"] = "Stripe";
    EntitlementSource["MANUAL"] = "Manual";
})(exports.EntitlementSource || (exports.EntitlementSource = {}));
exports.TransactionEnvironment = void 0;
(function (TransactionEnvironment) {
    TransactionEnvironment["PRODUCTION"] = "Production";
    TransactionEnvironment["SANDBOX"] = "Sandbox";
})(exports.TransactionEnvironment || (exports.TransactionEnvironment = {}));
exports.TransactionOwnershipType = void 0;
(function (TransactionOwnershipType) {
    TransactionOwnershipType["OWNER"] = "Owner";
    TransactionOwnershipType["FAMILY_SHARING"] = "FamilySharing";
})(exports.TransactionOwnershipType || (exports.TransactionOwnershipType = {}));
exports.EntitlementGrantType = void 0;
(function (EntitlementGrantType) {
    EntitlementGrantType["PURCHASE"] = "Purchase";
    EntitlementGrantType["FAMILY_SHARING"] = "FamilySharing";
    EntitlementGrantType["OFFER_CODE"] = "OfferCode";
    EntitlementGrantType["MANUAL"] = "Manual";
})(exports.EntitlementGrantType || (exports.EntitlementGrantType = {}));
exports.TransactionType = void 0;
(function (TransactionType) {
    TransactionType["UNKNOWN"] = "Unknown";
    TransactionType["SUBSCRIPTION_STARTED"] = "SubscriptionStarted";
    TransactionType["SUBSCRIPTION_RENEWED"] = "SubscriptionRenewed";
    TransactionType["TRIAL_STARTED"] = "TrialStarted";
    TransactionType["INTRO_STARTED"] = "IntroStarted";
    TransactionType["INTRO_RENEWED"] = "IntroRenewed";
    TransactionType["NON_CONSUMABLE_PURCHASE"] = "NonConsumablePurchase";
})(exports.TransactionType || (exports.TransactionType = {}));
exports.UserPropertyKey = void 0;
(function (UserPropertyKey) {
    UserPropertyKey["EMAIL"] = "Email";
    UserPropertyKey["NAME"] = "Name";
    UserPropertyKey["KOCHAVA_DEVICE_ID"] = "KochavaDeviceId";
    UserPropertyKey["APPS_FLYER_USER_ID"] = "AppsFlyerUserId";
    UserPropertyKey["ADJUST_AD_ID"] = "AdjustAdId";
    UserPropertyKey["CUSTOM_USER_ID"] = "CustomUserId";
    UserPropertyKey["FACEBOOK_ATTRIBUTION"] = "FacebookAttribution";
    UserPropertyKey["FIREBASE_APP_INSTANCE_ID"] = "FirebaseAppInstanceId";
    UserPropertyKey["APP_SET_ID"] = "AppSetId";
    UserPropertyKey["ADVERTISING_ID"] = "AdvertisingId";
    UserPropertyKey["APP_METRICA_DEVICE_ID"] = "AppMetricaDeviceId";
    UserPropertyKey["APP_METRICA_USER_PROFILE_ID"] = "AppMetricaUserProfileId";
    UserPropertyKey["PUSH_WOOSH_HW_ID"] = "PushWooshHwId";
    UserPropertyKey["PUSH_WOOSH_USER_ID"] = "PushWooshUserId";
    UserPropertyKey["CUSTOM"] = "Custom";
})(exports.UserPropertyKey || (exports.UserPropertyKey = {}));
exports.AttributionProvider = void 0;
(function (AttributionProvider) {
    AttributionProvider["APPSFLYER"] = "AppsFlyer";
    AttributionProvider["BRANCH"] = "Branch";
    AttributionProvider["ADJUST"] = "Adjust";
    AttributionProvider["APPLE_SEARCH_ADS"] = "AppleSearchAds";
    AttributionProvider["APPLE_AD_SERVICES"] = "AppleAdServices";
})(exports.AttributionProvider || (exports.AttributionProvider = {}));
/**
 * A policy used for purchase updates on Android, which describes
 * how to migrate from purchased plan to a new one.
 *
 * Used in {@link PurchaseOptions} class for purchase updates.
 */
exports.PurchaseUpdatePolicy = void 0;
(function (PurchaseUpdatePolicy) {
    /**
     * The new plan takes effect immediately, and the user is charged full price of new plan
     * and is given a full billing cycle of subscription, plus remaining prorated time
     * from the old plan.
     */
    PurchaseUpdatePolicy["CHARGE_FULL_PRICE"] = "ChargeFullPrice";
    /**
     * The new plan takes effect immediately, and the billing cycle remains the same.
     */
    PurchaseUpdatePolicy["CHARGE_PRORATED_PRICE"] = "ChargeProratedPrice";
    /**
     * The new plan takes effect immediately, and the remaining time will be prorated
     * and credited to the user.
     */
    PurchaseUpdatePolicy["WITH_TIME_PRORATION"] = "WithTimeProration";
    /**
     * The new purchase takes effect immediately, the new plan will take effect
     * when the old item expires.
     */
    PurchaseUpdatePolicy["DEFERRED"] = "Deferred";
    /**
     * The new plan takes effect immediately, and the new price will be charged
     * on next recurrence time.
     */
    PurchaseUpdatePolicy["WITHOUT_PRORATION"] = "WithoutProration";
    /**
     * Unknown police.
     */
    PurchaseUpdatePolicy["UNKNOWN"] = "Unknown";
})(exports.PurchaseUpdatePolicy || (exports.PurchaseUpdatePolicy = {}));
exports.EntitlementsCacheLifetime = void 0;
(function (EntitlementsCacheLifetime) {
    EntitlementsCacheLifetime["WEEK"] = "Week";
    EntitlementsCacheLifetime["TWO_WEEKS"] = "TwoWeeks";
    EntitlementsCacheLifetime["MONTH"] = "Month";
    EntitlementsCacheLifetime["TWO_MONTHS"] = "TwoMonths";
    EntitlementsCacheLifetime["THREE_MONTHS"] = "ThreeMonths";
    EntitlementsCacheLifetime["SIX_MONTHS"] = "SixMonths";
    EntitlementsCacheLifetime["YEAR"] = "Year";
    EntitlementsCacheLifetime["UNLIMITED"] = "Unlimited";
})(exports.EntitlementsCacheLifetime || (exports.EntitlementsCacheLifetime = {}));
const SKPeriodUnit = {
    0: "DAY",
    1: "WEEK",
    2: "MONTH",
    3: "YEAR",
};
const SKProductDiscountType = {
    0: "INTRODUCTORY",
    1: "SUBSCRIPTION",
};
const SKProductDiscountPaymentMode = {
    0: "PAY_AS_YOU_GO",
    1: "PAY_UP_FRONT",
    2: "FREE_TRIAL",
};
const OfferingTag = {
    "-1": "UNKNOWN",
    "0": "NONE",
    "1": "MAIN",
};
exports.IntroEligibilityStatus = void 0;
(function (IntroEligibilityStatus) {
    IntroEligibilityStatus["UNKNOWN"] = "unknown";
    IntroEligibilityStatus["NON_INTRO_OR_TRIAL_PRODUCT"] = "non_intro_or_trial_product";
    IntroEligibilityStatus["ELIGIBLE"] = "intro_or_trial_eligible";
    IntroEligibilityStatus["INELIGIBLE"] = "intro_or_trial_ineligible";
})(exports.IntroEligibilityStatus || (exports.IntroEligibilityStatus = {}));
exports.ExperimentGroupType = void 0;
(function (ExperimentGroupType) {
    ExperimentGroupType["UNKNOWN"] = "unknown";
    ExperimentGroupType["CONTROL"] = "control";
    ExperimentGroupType["TREATMENT"] = "treatment";
})(exports.ExperimentGroupType || (exports.ExperimentGroupType = {}));
exports.RemoteConfigurationSourceType = void 0;
(function (RemoteConfigurationSourceType) {
    RemoteConfigurationSourceType["UNKNOWN"] = "unknown";
    RemoteConfigurationSourceType["EXPERIMENT_CONTROL_GROUP"] = "experiment_control_group";
    RemoteConfigurationSourceType["EXPERIMENT_TREATMENT_GROUP"] = "experiment_treatment_group";
    RemoteConfigurationSourceType["REMOTE_CONFIGURATION"] = "remote_configuration";
})(exports.RemoteConfigurationSourceType || (exports.RemoteConfigurationSourceType = {}));
exports.RemoteConfigurationAssignmentType = void 0;
(function (RemoteConfigurationAssignmentType) {
    RemoteConfigurationAssignmentType["UNKNOWN"] = "unknown";
    RemoteConfigurationAssignmentType["AUTO"] = "auto";
    RemoteConfigurationAssignmentType["MANUAL"] = "manual";
})(exports.RemoteConfigurationAssignmentType || (exports.RemoteConfigurationAssignmentType = {}));
exports.ActionResultType = void 0;
(function (ActionResultType) {
    ActionResultType["UNKNOWN"] = "unknown";
    ActionResultType["URL"] = "url";
    ActionResultType["DEEPLINK"] = "deeplink";
    ActionResultType["NAVIGATION"] = "navigate";
    ActionResultType["PURCHASE"] = "purchase";
    ActionResultType["RESTORE"] = "restore";
    ActionResultType["CLOSE"] = "close";
})(exports.ActionResultType || (exports.ActionResultType = {}));
exports.QonversionErrorCode = void 0;
(function (QonversionErrorCode) {
    QonversionErrorCode["UNKNOWN"] = "Unknown";
    QonversionErrorCode["API_RATE_LIMIT_EXCEEDED"] = "ApiRateLimitExceeded";
    QonversionErrorCode["APPLE_STORE_ERROR"] = "AppleStoreError";
    QonversionErrorCode["BACKEND_ERROR"] = "BackendError";
    QonversionErrorCode["BILLING_UNAVAILABLE"] = "BillingUnavailable";
    QonversionErrorCode["CLIENT_INVALID"] = "ClientInvalid";
    QonversionErrorCode["CLOUD_SERVICE_NETWORK_CONNECTION_FAILED"] = "CloudServiceNetworkConnectionFailed";
    QonversionErrorCode["CLOUD_SERVICE_PERMISSION_DENIED"] = "CloudServicePermissionDenied";
    QonversionErrorCode["CLOUD_SERVICE_REVOKED"] = "CloudServiceRevoked";
    QonversionErrorCode["FAILED_TO_RECEIVE_DATA"] = "FailedToReceiveData";
    QonversionErrorCode["FEATURE_NOT_SUPPORTED"] = "FeatureNotSupported";
    QonversionErrorCode["FRAUD_PURCHASE"] = "FraudPurchase";
    QonversionErrorCode["INCORRECT_REQUEST"] = "IncorrectRequest";
    QonversionErrorCode["INTERNAL_ERROR"] = "InternalError";
    QonversionErrorCode["INVALID_CLIENT_UID"] = "InvalidClientUid";
    QonversionErrorCode["INVALID_CREDENTIALS"] = "InvalidCredentials";
    QonversionErrorCode["INVALID_STORE_CREDENTIALS"] = "InvalidStoreCredentials";
    QonversionErrorCode["LAUNCH_ERROR"] = "LaunchError";
    QonversionErrorCode["NETWORK_CONNECTION_FAILED"] = "NetworkConnectionFailed";
    QonversionErrorCode["OFFERINGS_NOT_FOUND"] = "OfferingsNotFound";
    QonversionErrorCode["PAYMENT_INVALID"] = "PaymentInvalid";
    QonversionErrorCode["PAYMENT_NOT_ALLOWED"] = "PaymentNotAllowed";
    QonversionErrorCode["PLAY_STORE_ERROR"] = "PlayStoreError";
    QonversionErrorCode["PRIVACY_ACKNOWLEDGEMENT_REQUIRED"] = "PrivacyAcknowledgementRequired";
    QonversionErrorCode["PRODUCT_ALREADY_OWNED"] = "ProductAlreadyOwned";
    QonversionErrorCode["PRODUCT_NOT_FOUND"] = "ProductNotFound";
    QonversionErrorCode["PRODUCT_NOT_OWNED"] = "ProductNotOwned";
    QonversionErrorCode["PROJECT_CONFIG_ERROR"] = "ProjectConfigError";
    QonversionErrorCode["PURCHASE_CANCELED"] = "PurchaseCanceled";
    QonversionErrorCode["PURCHASE_INVALID"] = "PurchaseInvalid";
    QonversionErrorCode["PURCHASE_PENDING"] = "PurchasePending";
    QonversionErrorCode["PURCHASE_UNSPECIFIED"] = "PurchaseUnspecified";
    QonversionErrorCode["RECEIPT_VALIDATION_ERROR"] = "ReceiptValidationError";
    QonversionErrorCode["REMOTE_CONFIGURATION_NOT_AVAILABLE"] = "RemoteConfigurationNotAvailable";
    QonversionErrorCode["RESPONSE_PARSING_FAILED"] = "ResponseParsingFailed";
    QonversionErrorCode["STORE_PRODUCT_NOT_AVAILABLE"] = "StoreProductNotAvailable";
    QonversionErrorCode["UNAUTHORIZED_REQUEST_DATA"] = "UnauthorizedRequestData";
    QonversionErrorCode["UNKNOWN_CLIENT_PLATFORM"] = "UnknownClientPlatform";
})(exports.QonversionErrorCode || (exports.QonversionErrorCode = {}));

class Entitlement {
    constructor(id, productId, isActive, renewState, source, startedTimestamp, renewsCount, grantType, transactions, expirationTimestamp, trialStartTimestamp, firstPurchaseTimestamp, lastPurchaseTimestamp, autoRenewDisableTimestamp, lastActivatedOfferCode) {
        this.id = id;
        this.productId = productId;
        this.isActive = isActive;
        this.renewState = renewState;
        this.source = source;
        this.startedDate = new Date(startedTimestamp);
        this.expirationDate = expirationTimestamp ? new Date(expirationTimestamp) : undefined;
        this.renewsCount = renewsCount;
        this.grantType = grantType;
        this.transactions = transactions;
        this.expirationDate = expirationTimestamp ? new Date(expirationTimestamp) : undefined;
        this.trialStartDate = trialStartTimestamp ? new Date(trialStartTimestamp) : undefined;
        this.firstPurchaseDate = firstPurchaseTimestamp ? new Date(firstPurchaseTimestamp) : undefined;
        this.lastPurchaseDate = lastPurchaseTimestamp ? new Date(lastPurchaseTimestamp) : undefined;
        this.autoRenewDisableDate = autoRenewDisableTimestamp ? new Date(autoRenewDisableTimestamp) : undefined;
        this.lastActivatedOfferCode = lastActivatedOfferCode;
    }
}

class IntroEligibility {
    constructor(status) {
        this.status = status;
    }
}

class Offering {
    constructor(id, tag, products) {
        this.id = id;
        this.tag = tag;
        this.products = products;
    }
    productForIdentifier(identifier) {
        return this.products.find((object) => object.qonversionID === identifier);
    }
}

class Offerings {
    constructor(main, availableOfferings) {
        this.main = main;
        this.availableOffering = availableOfferings;
    }
    offeringForIdentifier(identifier) {
        return this.availableOffering.find((object) => object.id === identifier);
    }
}

/**
 * Used to provide all the necessary purchase data to the {@link Qonversion.purchase} method.
 * Can be created manually or using the {@link Product.toPurchaseModel} method.
 *
 * If {@link offerId} is not specified for Android, then the default offer will be applied.
 * To know how we choose the default offer, see {@link ProductStoreDetails.defaultSubscriptionOfferDetails}.
 *
 * If you want to remove any intro/trial offer from the purchase on Android (use only a bare base plan),
 * call the {@link removeOffer} method.
 */
class PurchaseModel {
    constructor(productId, offerId = null) {
        this.offerId = null;
        this.applyOffer = true;
        this.productId = productId;
        this.offerId = offerId;
    }
    removeOffer() {
        this.applyOffer = false;
        return this;
    }
}

/**
 * Used to provide all the necessary purchase data to the {@link Qonversion.updatePurchase} method.
 * Can be created manually or using the {@link Product.toPurchaseUpdateModel} method.
 *
 * Requires Qonversion product identifiers - {@link productId} for the purchasing one and
 * {@link oldProductId} for the purchased one.
 *
 * If {@link offerId} is not specified for Android, then the default offer will be applied.
 * To know how we choose the default offer, see {@link ProductStoreDetails.defaultSubscriptionOfferDetails}.
 *
 * If you want to remove any intro/trial offer from the purchase on Android (use only a bare base plan),
 * call the {@link removeOffer} method.
 */
class PurchaseUpdateModel {
    constructor(productId, oldProductId, updatePolicy = null, offerId = null) {
        this.updatePolicy = null;
        this.offerId = null;
        this.applyOffer = true;
        this.productId = productId;
        this.oldProductId = oldProductId;
        this.updatePolicy = updatePolicy;
        this.offerId = offerId;
    }
    removeOffer() {
        this.applyOffer = false;
        return this;
    }
}

class Product {
    constructor(qonversionID, storeID, basePlanID, skuDetails, storeDetails, skProduct, offeringId, subscriptionPeriod, trialPeriod, type, prettyPrice, price, currencyCode, storeTitle, storeDescription, prettyIntroductoryPrice) {
        this.qonversionID = qonversionID;
        this.storeID = storeID;
        this.basePlanID = basePlanID;
        this.skuDetails = skuDetails;
        this.storeDetails = storeDetails;
        this.skProduct = skProduct;
        this.offeringId = offeringId;
        this.subscriptionPeriod = subscriptionPeriod;
        this.trialPeriod = trialPeriod;
        this.type = type;
        this.prettyPrice = prettyPrice;
        this.price = price;
        this.currencyCode = currencyCode;
        this.storeTitle = storeTitle;
        this.storeDescription = storeDescription;
        this.prettyIntroductoryPrice = prettyIntroductoryPrice;
    }
    /**
     * Converts this product to purchase model to pass to {@link Qonversion.purchase}.
     * @param offerId concrete Android offer identifier if necessary.
     *                If the products' base plan id is specified, but offer id is not provided for
     *                purchase, then default offer will be used.
     *                Ignored if base plan id is not specified.
     *                Ignored for iOS.
     * To know how we choose the default offer, see {@link ProductStoreDetails.defaultSubscriptionOfferDetails}.
     * @returns purchase model to pass to the purchase method.
     */
    toPurchaseModel(offerId = null) {
        return new PurchaseModel(this.qonversionID, offerId);
    }
    /**
     * Converts this product to purchase model to pass to {@link Qonversion.purchase}.
     * @param offer concrete Android offer which you'd like to purchase.
     * @return purchase model to pass to the purchase method.
     */
    toPurchaseModelWithOffer(offer) {
        const model = this.toPurchaseModel(offer.offerId);
        // Remove offer for the case when provided offer details are for bare base plan.
        if (offer.offerId == null) {
            model.removeOffer();
        }
        return model;
    }
    /**
     * Android only.
     *
     * Converts this product to purchase update (upgrade/downgrade) model
     * to pass to {@link Qonversion.updatePurchase}.
     * @param oldProductId Qonversion product identifier from which the upgrade/downgrade
     *                     will be initialized.
     * @param updatePolicy purchase update policy.
     * @return purchase model to pass to the update purchase method.
     */
    toPurchaseUpdateModel(oldProductId, updatePolicy = null) {
        return new PurchaseUpdateModel(this.qonversionID, oldProductId, updatePolicy);
    }
}

class QonversionError {
    constructor(code, description, additionalMessage, domain) {
        this.code = code;
        this.domain = domain;
        this.description = description;
        this.additionalMessage = additionalMessage;
    }
}

class User {
    constructor(qonversionId, identityId) {
        this.qonversionId = qonversionId;
        this.identityId = identityId;
    }
}

class SKProduct {
    constructor(localizedDescription, localizedTitle, price, localeIdentifier, productIdentifier, isDownloadable, downloadContentVersion, downloadContentLengths, subscriptionPeriod, productDiscount, discounts, subscriptionGroupIdentifier, isFamilyShareable, currencyCode) {
        this.localizedDescription = localizedDescription;
        this.localizedTitle = localizedTitle;
        this.price = price;
        this.localeIdentifier = localeIdentifier;
        this.productIdentifier = productIdentifier;
        this.isDownloadable = isDownloadable;
        this.downloadContentVersion = downloadContentVersion;
        this.downloadContentLengths = downloadContentLengths;
        this.subscriptionPeriod = subscriptionPeriod;
        this.productDiscount = productDiscount;
        this.discounts = discounts;
        this.subscriptionGroupIdentifier = subscriptionGroupIdentifier;
        this.isFamilyShareable = isFamilyShareable;
        this.currencyCode = currencyCode;
    }
}

class SKProductDiscount {
    constructor(price, localeIdentifier, numberOfPeriods, subscriptionPeriod, paymentMode, identifier, type, currencySymbol) {
        this.price = price;
        this.localeIdentifier = localeIdentifier;
        this.numberOfPeriods = numberOfPeriods;
        this.subscriptionPeriod = subscriptionPeriod;
        this.paymentMode = paymentMode;
        this.identifier = identifier;
        this.type = type;
        this.currencySymbol = currencySymbol;
    }
}

class SKSubscriptionPeriod {
    constructor(numberOfUnits, unit) {
        this.numberOfUnits = numberOfUnits;
        this.unit = unit;
    }
}

/**
 * @deprecated
 */
class SkuDetails {
    constructor(description, freeTrialPeriod, iconUrl, introductoryPrice, introductoryPriceAmountMicros, introductoryPriceCycles, introductoryPricePeriod, originalJson, originalPrice, originalPriceAmountMicros, price, priceAmountMicros, priceCurrencyCode, sku, subscriptionPeriod, title, type, hashCode, toString) {
        this.description = description;
        this.freeTrialPeriod = freeTrialPeriod;
        this.iconUrl = iconUrl;
        this.introductoryPrice = introductoryPrice;
        this.introductoryPriceAmountMicros = introductoryPriceAmountMicros;
        this.introductoryPriceCycles = introductoryPriceCycles;
        this.introductoryPricePeriod = introductoryPricePeriod;
        this.originalJson = originalJson;
        this.originalPrice = originalPrice;
        this.originalPriceAmountMicros = originalPriceAmountMicros;
        this.price = price;
        this.priceAmountMicros = priceAmountMicros;
        this.priceCurrencyCode = priceCurrencyCode;
        this.sku = sku;
        this.subscriptionPeriod = subscriptionPeriod;
        this.title = title;
        this.type = type;
        this.hashCode = hashCode;
        this.toString = toString;
    }
}

class ActionResult {
    constructor(type, value, error) {
        this.type = type;
        this.value = value;
        this.error = error;
    }
}

class Experiment {
    constructor(id, name, group) {
        this.id = id;
        this.name = name;
        this.group = group;
    }
}

class ExperimentGroup {
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

/**
 * A class describing a subscription period
 */
class SubscriptionPeriod {
    constructor(unitCount, unit, iso) {
        this.unitCount = unitCount;
        this.unit = unit;
        this.iso = iso;
    }
}

class RemoteConfig {
    constructor(payload, experiment, source) {
        this.payload = payload;
        this.experiment = experiment;
        this.source = source;
    }
}

class RemoteConfigList {
    constructor(remoteConfigs) {
        this.remoteConfigs = remoteConfigs;
    }
    remoteConfigForContextKey(contextKey) {
        return this.findRemoteConfigForContextKey(contextKey);
    }
    remoteConfigForEmptyContextKey() {
        return this.findRemoteConfigForContextKey(null);
    }
    findRemoteConfigForContextKey(contextKey) {
        return this.remoteConfigs.find(config => config.source.contextKey == contextKey);
    }
}

class UserProperties {
    constructor(properties) {
        this.properties = properties;
        this.definedProperties = properties.filter(property => property.definedKey !== exports.UserPropertyKey.CUSTOM);
        this.customProperties = properties.filter(property => property.definedKey === exports.UserPropertyKey.CUSTOM);
        this.flatPropertiesMap = new Map();
        this.flatDefinedPropertiesMap = new Map();
        this.flatCustomPropertiesMap = new Map();
        properties.forEach(property => {
            this.flatPropertiesMap.set(property.key, property.value);
            if (property.definedKey == exports.UserPropertyKey.CUSTOM) {
                this.flatCustomPropertiesMap.set(property.key, property.value);
            }
            else {
                this.flatDefinedPropertiesMap.set(property.definedKey, property.value);
            }
        });
    }
    /**
     * Searches for a property with the given property {@link key} in all properties list.
     */
    getProperty(key) {
        return this.properties.find(userProperty => userProperty.key == key);
    }
    /**
     * Searches for a property with the given Qonversion defined property {@link key}
     * in defined properties list.
     */
    getDefinedProperty(key) {
        return this.definedProperties.find(userProperty => userProperty.definedKey == key);
    }
}

class RemoteConfigurationSource {
    constructor(id, name, type, assignmentType, contextKey) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.assignmentType = assignmentType;
        this.contextKey = contextKey;
    }
}

class Transaction {
    constructor(originalTransactionId, transactionId, transactionTimestamp, environment, ownershipType, type, expirationTimestamp, transactionRevocationTimestamp, offerCode) {
        this.originalTransactionId = originalTransactionId;
        this.transactionId = transactionId;
        this.transactionDate = new Date(transactionTimestamp);
        this.environment = environment;
        this.ownershipType = ownershipType;
        this.type = type;
        this.expirationDate = expirationTimestamp ? new Date(expirationTimestamp) : undefined;
        this.transactionRevocationDate = transactionRevocationTimestamp ? new Date(transactionRevocationTimestamp) : undefined;
        this.offerCode = offerCode;
    }
}

/**
 * This class contains all the information about the concrete Google product,
 * either subscription or in-app. In case of a subscription also determines concrete base plan.
 */
class ProductStoreDetails {
    constructor(basePlanId, productId, name, title, description, subscriptionOfferDetails, defaultSubscriptionOfferDetails, basePlanSubscriptionOfferDetails, inAppOfferDetails, hasTrialOffer, hasIntroOffer, hasTrialOrIntroOffer, productType, isInApp, isSubscription, isPrepaid, isInstallment) {
        this.basePlanId = basePlanId;
        this.productId = productId;
        this.name = name;
        this.title = title;
        this.description = description;
        this.subscriptionOfferDetails = subscriptionOfferDetails;
        this.defaultSubscriptionOfferDetails = defaultSubscriptionOfferDetails;
        this.basePlanSubscriptionOfferDetails = basePlanSubscriptionOfferDetails;
        this.inAppOfferDetails = inAppOfferDetails;
        this.hasTrialOffer = hasTrialOffer;
        this.hasIntroOffer = hasIntroOffer;
        this.hasTrialOrIntroOffer = hasTrialOrIntroOffer;
        this.productType = productType;
        this.isInApp = isInApp;
        this.isSubscription = isSubscription;
        this.isPrepaid = isPrepaid;
        this.isInstallment = isInstallment;
    }
}

/**
 * This class contains all the information about the Google subscription offer details.
 * It might be either a plain base plan details or a base plan with the concrete offer details.
 */
class ProductOfferDetails {
    constructor(basePlanId, offerId, offerToken, tags, pricingPhases, basePlan, installmentPlanDetails, introPhase, trialPhase, hasTrial, hasIntro, hasTrialOrIntro) {
        this.basePlanId = basePlanId;
        this.offerId = offerId;
        this.offerToken = offerToken;
        this.tags = tags;
        this.pricingPhases = pricingPhases;
        this.basePlan = basePlan;
        this.installmentPlanDetails = installmentPlanDetails;
        this.introPhase = introPhase;
        this.trialPhase = trialPhase;
        this.hasTrial = hasTrial;
        this.hasIntro = hasIntro;
        this.hasTrialOrIntro = hasTrialOrIntro;
    }
}

/**
 * This class contains all the information about the Google in-app product details.
 */
class ProductInAppDetails {
    constructor(price) {
        this.price = price;
    }
}

/**
 * Information about the Google product's price.
 */
class ProductPrice {
    constructor(priceAmountMicros, priceCurrencyCode, formattedPrice, isFree, currencySymbol = null) {
        this.priceAmountMicros = priceAmountMicros;
        this.priceCurrencyCode = priceCurrencyCode;
        this.formattedPrice = formattedPrice;
        this.isFree = isFree;
        this.currencySymbol = currencySymbol;
    }
}

/**
 * This class represents a pricing phase, describing how a user pays at a point in time.
 */
class ProductPricingPhase {
    constructor(price, billingPeriod, billingCycleCount, recurrenceMode, type, isTrial, isIntro, isBasePlan) {
        this.price = price;
        this.billingPeriod = billingPeriod;
        this.billingCycleCount = billingCycleCount;
        this.recurrenceMode = recurrenceMode;
        this.type = type;
        this.isTrial = isTrial;
        this.isIntro = isIntro;
        this.isBasePlan = isBasePlan;
    }
}

/**
 * This class represents the details about the installment plan for a subscription product.
 */
class ProductInstallmentPlanDetails {
    constructor(commitmentPaymentsCount, subsequentCommitmentPaymentsCount) {
        this.commitmentPaymentsCount = commitmentPaymentsCount;
        this.subsequentCommitmentPaymentsCount = subsequentCommitmentPaymentsCount;
    }
}

const priceMicrosRatio = 1000000;
class Mapper {
    static convertEntitlements(entitlements) {
        let mappedPermissions = new Map();
        if (!entitlements) {
            return mappedPermissions;
        }
        for (const [key, entitlement] of Object.entries(entitlements)) {
            let renewState;
            switch (entitlement.renewState) {
                case exports.EntitlementRenewState.NON_RENEWABLE:
                    renewState = exports.EntitlementRenewState.NON_RENEWABLE;
                    break;
                case exports.EntitlementRenewState.WILL_RENEW:
                    renewState = exports.EntitlementRenewState.WILL_RENEW;
                    break;
                case exports.EntitlementRenewState.CANCELED:
                    renewState = exports.EntitlementRenewState.CANCELED;
                    break;
                case exports.EntitlementRenewState.BILLING_ISSUE:
                    renewState = exports.EntitlementRenewState.BILLING_ISSUE;
                    break;
                default:
                    renewState = exports.EntitlementRenewState.UNKNOWN;
                    break;
            }
            const entitlementSource = this.convertEntitlementSource(entitlement.source);
            const entitlementGrantType = this.convertEntitlementGrantType(entitlement.grantType);
            const transactions = [];
            if (Array.isArray(entitlement.transactions)) {
                entitlement.transactions.forEach((transaction) => {
                    const mappedTransaction = this.convertTransaction(transaction);
                    transactions.push(mappedTransaction);
                });
            }
            const mappedPermission = new Entitlement(entitlement.id, entitlement.productId, entitlement.active, renewState, entitlementSource, entitlement.startedTimestamp, entitlement.renewsCount, entitlementGrantType, transactions, entitlement.expirationTimestamp, entitlement.trialStartTimestamp, entitlement.firstPurchaseTimestamp, entitlement.lastPurchaseTimestamp, entitlement.autoRenewDisableTimestamp, entitlement.lastActivatedOfferCode);
            mappedPermissions.set(key, mappedPermission);
        }
        return mappedPermissions;
    }
    static convertTransaction(transaction) {
        const environment = this.convertTransactionEnvironment(transaction.environment);
        const ownershipType = this.convertTransactionOwnershipType(transaction.ownershipType);
        const type = this.convertTransactionType(transaction.type);
        return new Transaction(transaction.originalTransactionId, transaction.transactionId, transaction.transactionTimestamp, environment, ownershipType, type, transaction.expirationTimestamp, transaction.transactionRevocationTimestamp, transaction.offerCode);
    }
    static convertTransactionType(typeKey) {
        switch (typeKey) {
            case "SubscriptionStarted":
                return exports.TransactionType.SUBSCRIPTION_STARTED;
            case "SubscriptionRenewed":
                return exports.TransactionType.SUBSCRIPTION_RENEWED;
            case "TrialStarted":
                return exports.TransactionType.TRIAL_STARTED;
            case "IntroStarted":
                return exports.TransactionType.INTRO_STARTED;
            case "IntroRenewed":
                return exports.TransactionType.INTRO_RENEWED;
            case "NonConsumablePurchase":
                return exports.TransactionType.NON_CONSUMABLE_PURCHASE;
        }
        return exports.TransactionType.UNKNOWN;
    }
    static convertTransactionOwnershipType(ownershipTypeKey) {
        switch (ownershipTypeKey) {
            case "Owner":
                return exports.TransactionOwnershipType.OWNER;
            case "FamilySharing":
                return exports.TransactionOwnershipType.FAMILY_SHARING;
        }
        return exports.TransactionOwnershipType.OWNER;
    }
    static convertTransactionEnvironment(envKey) {
        switch (envKey) {
            case "Production":
                return exports.TransactionEnvironment.PRODUCTION;
            case "Sandbox":
                return exports.TransactionEnvironment.SANDBOX;
        }
        return exports.TransactionEnvironment.PRODUCTION;
    }
    static convertEntitlementSource(sourceKey) {
        switch (sourceKey) {
            case "Unknown":
                return exports.EntitlementSource.UNKNOWN;
            case "AppStore":
                return exports.EntitlementSource.APP_STORE;
            case "PlayStore":
                return exports.EntitlementSource.PLAY_STORE;
            case "Stripe":
                return exports.EntitlementSource.STRIPE;
            case "Manual":
                return exports.EntitlementSource.MANUAL;
        }
        return exports.EntitlementSource.UNKNOWN;
    }
    static convertEntitlementGrantType(typeKey) {
        switch (typeKey) {
            case "Purchase":
                return exports.EntitlementGrantType.PURCHASE;
            case "FamilySharing":
                return exports.EntitlementGrantType.FAMILY_SHARING;
            case "OfferCode":
                return exports.EntitlementGrantType.OFFER_CODE;
            case "Manual":
                return exports.EntitlementGrantType.MANUAL;
        }
        return exports.EntitlementGrantType.PURCHASE;
    }
    static convertDefinedUserPropertyKey(sourceKey) {
        switch (sourceKey) {
            case '_q_email':
                return exports.UserPropertyKey.EMAIL;
            case '_q_name':
                return exports.UserPropertyKey.NAME;
            case '_q_kochava_device_id':
                return exports.UserPropertyKey.KOCHAVA_DEVICE_ID;
            case '_q_appsflyer_user_id':
                return exports.UserPropertyKey.APPS_FLYER_USER_ID;
            case '_q_adjust_adid':
                return exports.UserPropertyKey.ADJUST_AD_ID;
            case '_q_custom_user_id':
                return exports.UserPropertyKey.CUSTOM_USER_ID;
            case '_q_fb_attribution':
                return exports.UserPropertyKey.FACEBOOK_ATTRIBUTION;
            case '_q_firebase_instance_id':
                return exports.UserPropertyKey.FIREBASE_APP_INSTANCE_ID;
            case '_q_app_set_id':
                return exports.UserPropertyKey.APP_SET_ID;
            case '_q_advertising_id':
                return exports.UserPropertyKey.ADVERTISING_ID;
            case "_q_appmetrica_device_id":
                return exports.UserPropertyKey.APP_METRICA_DEVICE_ID;
            case "_q_appmetrica_user_profile_id":
                return exports.UserPropertyKey.APP_METRICA_USER_PROFILE_ID;
            case "_q_pushwoosh_hwid":
                return exports.UserPropertyKey.PUSH_WOOSH_HW_ID;
            case "_q_pushwoosh_user_id":
                return exports.UserPropertyKey.PUSH_WOOSH_USER_ID;
        }
        return exports.UserPropertyKey.CUSTOM;
    }
    static convertUserProperties(properties) {
        const mappedProperties = properties.properties.map(propertyData => new UserProperty(propertyData.key, propertyData.value));
        return new UserProperties(mappedProperties);
    }
    static convertProducts(products) {
        let mappedProducts = new Map();
        if (!products) {
            return mappedProducts;
        }
        for (const [key, product] of Object.entries(products)) {
            const mappedProduct = this.convertProduct(product);
            mappedProducts.set(key, mappedProduct);
        }
        return mappedProducts;
    }
    static convertProduct(product) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const productType = Mapper.convertProductType(product.type);
        const subscriptionPeriod = Mapper.convertSubscriptionPeriod(product.subscriptionPeriod);
        const trialPeriod = Mapper.convertSubscriptionPeriod(product.trialPeriod);
        const offeringId = (_a = product.offeringId) !== null && _a !== void 0 ? _a : null;
        let skProduct = null;
        let skuDetails = null;
        let storeDetails = null;
        let price;
        let currencyCode;
        let storeTitle;
        let storeDescription;
        let prettyIntroductoryPrice;
        if (!!product.skProduct) {
            skProduct = Mapper.convertSKProduct(product.skProduct);
            price = parseFloat(skProduct.price);
            currencyCode = skProduct.currencyCode;
            storeTitle = skProduct.localizedTitle;
            storeDescription = skProduct.localizedDescription;
            if (skProduct.productDiscount) {
                prettyIntroductoryPrice = skProduct.productDiscount.currencySymbol + skProduct.productDiscount.price;
            }
        }
        else {
            let priceMicros = null;
            if (!!product.skuDetails) {
                skuDetails = Mapper.convertSkuDetails(product.skuDetails);
                storeTitle = skuDetails.title;
                storeDescription = skuDetails.description;
                priceMicros = skuDetails.priceAmountMicros;
                currencyCode = skuDetails.priceCurrencyCode;
                if (skuDetails.introductoryPrice.length > 0) {
                    prettyIntroductoryPrice = skuDetails.introductoryPrice;
                }
            }
            if (!!product.storeDetails) {
                storeDetails = Mapper.convertProductStoreDetails(product.storeDetails);
                storeTitle = storeDetails.title;
                storeDescription = storeDetails.description;
                const defaultOffer = storeDetails.defaultSubscriptionOfferDetails;
                const inAppOffer = storeDetails.inAppOfferDetails;
                if (defaultOffer) {
                    priceMicros = (_c = (_b = defaultOffer.basePlan) === null || _b === void 0 ? void 0 : _b.price) === null || _c === void 0 ? void 0 : _c.priceAmountMicros;
                    currencyCode = (_e = (_d = defaultOffer.basePlan) === null || _d === void 0 ? void 0 : _d.price) === null || _e === void 0 ? void 0 : _e.priceCurrencyCode;
                    prettyIntroductoryPrice = (_g = (_f = defaultOffer.introPhase) === null || _f === void 0 ? void 0 : _f.price) === null || _g === void 0 ? void 0 : _g.formattedPrice;
                }
                else if (inAppOffer) {
                    priceMicros = inAppOffer.price.priceAmountMicros;
                    currencyCode = inAppOffer.price.priceCurrencyCode;
                    prettyIntroductoryPrice = undefined;
                }
            }
            price = priceMicros ? priceMicros / priceMicrosRatio : undefined;
        }
        const mappedProduct = new Product(product.id, product.storeId, (_h = product.basePlanId) !== null && _h !== void 0 ? _h : null, skuDetails, storeDetails, skProduct, offeringId, subscriptionPeriod, trialPeriod, productType, (_j = product.prettyPrice) !== null && _j !== void 0 ? _j : null, price, currencyCode, storeTitle, storeDescription, prettyIntroductoryPrice);
        return mappedProduct;
    }
    static convertOfferings(offerings) {
        if (!offerings) {
            return null;
        }
        if (!Array.isArray(offerings.availableOfferings) ||
            offerings.availableOfferings.length === 0) {
            return null;
        }
        let mainOffering = null;
        if (offerings.main) {
            mainOffering = this.convertOffering(offerings.main);
        }
        const availableOfferings = [];
        offerings.availableOfferings.forEach((offering) => {
            const mappedOffering = this.convertOffering(offering);
            availableOfferings.push(mappedOffering);
        });
        return new Offerings(mainOffering, availableOfferings);
    }
    static convertOffering(offering) {
        var _a;
        const products = [];
        offering.products.forEach((product) => {
            const mappedProduct = this.convertProduct(product);
            products.push(mappedProduct);
        });
        const tag = (_a = OfferingTag[offering.tag]) !== null && _a !== void 0 ? _a : OfferingTag['0'];
        return new Offering(offering.id, tag, products);
    }
    static convertSkuDetails(skuDetails) {
        return new SkuDetails(skuDetails.description, skuDetails.freeTrialPeriod, skuDetails.iconUrl, skuDetails.introductoryPrice, skuDetails.introductoryPriceAmountMicros, skuDetails.introductoryPriceCycles, skuDetails.introductoryPricePeriod, skuDetails.originalJson, skuDetails.originalPrice, skuDetails.originalPriceAmountMicros, skuDetails.price, skuDetails.priceAmountMicros, skuDetails.priceCurrencyCode, skuDetails.sku, skuDetails.subscriptionPeriod, skuDetails.title, skuDetails.type, skuDetails.hashCode, skuDetails.toString);
    }
    static convertProductType(productType) {
        let type = exports.ProductType.UNKNOWN;
        switch (productType) {
            case exports.ProductType.TRIAL:
                type = exports.ProductType.TRIAL;
                break;
            case exports.ProductType.INTRO:
                type = exports.ProductType.INTRO;
                break;
            case exports.ProductType.SUBSCRIPTION:
                type = exports.ProductType.SUBSCRIPTION;
                break;
            case exports.ProductType.IN_APP:
                type = exports.ProductType.IN_APP;
                break;
        }
        return type;
    }
    static convertSubscriptionPeriod(productPeriod) {
        if (!productPeriod) {
            return null;
        }
        const unit = Mapper.convertSubscriptionPeriodUnit(productPeriod.unit);
        return new SubscriptionPeriod(productPeriod.unitCount, unit, productPeriod.iso);
    }
    static convertSubscriptionPeriodUnit(unit) {
        let result = exports.SubscriptionPeriodUnit.UNKNOWN;
        switch (unit) {
            case exports.SubscriptionPeriodUnit.DAY:
                result = exports.SubscriptionPeriodUnit.DAY;
                break;
            case exports.SubscriptionPeriodUnit.WEEK:
                result = exports.SubscriptionPeriodUnit.WEEK;
                break;
            case exports.SubscriptionPeriodUnit.MONTH:
                result = exports.SubscriptionPeriodUnit.MONTH;
                break;
            case exports.SubscriptionPeriodUnit.YEAR:
                result = exports.SubscriptionPeriodUnit.YEAR;
                break;
        }
        return result;
    }
    static convertProductPricingPhase(pricingPhase) {
        if (!pricingPhase) {
            return null;
        }
        const price = Mapper.convertProductPrice(pricingPhase.price);
        const billingPeriod = Mapper.convertSubscriptionPeriod(pricingPhase.billingPeriod);
        const recurrenceMode = Mapper.convertPrisingPhaseRecurrenceMode(pricingPhase.recurrenceMode);
        const type = Mapper.convertPrisingPhaseType(pricingPhase.type);
        return new ProductPricingPhase(price, billingPeriod, pricingPhase.billingCycleCount, recurrenceMode, type, pricingPhase.isTrial, pricingPhase.isIntro, pricingPhase.isBasePlan);
    }
    static convertPrisingPhaseRecurrenceMode(recurrenceMode) {
        let mode = exports.PricingPhaseRecurrenceMode.UNKNOWN;
        switch (recurrenceMode) {
            case exports.PricingPhaseRecurrenceMode.INFINITE_RECURRING:
                mode = exports.PricingPhaseRecurrenceMode.INFINITE_RECURRING;
                break;
            case exports.PricingPhaseRecurrenceMode.FINITE_RECURRING:
                mode = exports.PricingPhaseRecurrenceMode.FINITE_RECURRING;
                break;
            case exports.PricingPhaseRecurrenceMode.NON_RECURRING:
                mode = exports.PricingPhaseRecurrenceMode.NON_RECURRING;
                break;
        }
        return mode;
    }
    static convertPrisingPhaseType(type) {
        let result = exports.PricingPhaseType.UNKNOWN;
        switch (type) {
            case exports.PricingPhaseType.REGULAR:
                result = exports.PricingPhaseType.REGULAR;
                break;
            case exports.PricingPhaseType.FREE_TRIAL:
                result = exports.PricingPhaseType.FREE_TRIAL;
                break;
            case exports.PricingPhaseType.DISCOUNTED_SINGLE_PAYMENT:
                result = exports.PricingPhaseType.DISCOUNTED_SINGLE_PAYMENT;
                break;
            case exports.PricingPhaseType.DISCOUNTED_RECURRING_PAYMENT:
                result = exports.PricingPhaseType.DISCOUNTED_RECURRING_PAYMENT;
                break;
        }
        return result;
    }
    static convertProductInstallmentPlanDetails(installmentPlanDetails) {
        if (!installmentPlanDetails) {
            return null;
        }
        return new ProductInstallmentPlanDetails(installmentPlanDetails.commitmentPaymentsCount, installmentPlanDetails.subsequentCommitmentPaymentsCount);
    }
    static convertProductOfferDetails(offerDetails) {
        var _a;
        let basePlan = Mapper.convertProductPricingPhase(offerDetails.basePlan);
        let trialPhase = Mapper.convertProductPricingPhase(offerDetails.trialPhase);
        let introPhase = Mapper.convertProductPricingPhase(offerDetails.introPhase);
        let installmentPlanDetails = Mapper.convertProductInstallmentPlanDetails(offerDetails.installmentPlanDetails);
        let pricingPhases = offerDetails.pricingPhases.map(pricingPhase => Mapper.convertProductPricingPhase(pricingPhase)).filter(Boolean);
        return new ProductOfferDetails(offerDetails.basePlanId, (_a = offerDetails.offerId) !== null && _a !== void 0 ? _a : null, offerDetails.offerToken, offerDetails.tags, pricingPhases, basePlan, installmentPlanDetails, introPhase, trialPhase, offerDetails.hasTrial, offerDetails.hasIntro, offerDetails.hasTrialOrIntro);
    }
    static convertInAppOfferDetails(inAppOfferDetails) {
        let productPrice = this.convertProductPrice(inAppOfferDetails.price);
        return new ProductInAppDetails(productPrice);
    }
    static convertProductPrice(productPrice) {
        return new ProductPrice(productPrice.priceAmountMicros, productPrice.priceCurrencyCode, productPrice.formattedPrice, productPrice.isFree, productPrice.currencySymbol);
    }
    static convertProductStoreDetails(productStoreDetails) {
        var _a;
        let defaultSubscriptionOfferDetails = null;
        if (productStoreDetails.defaultSubscriptionOfferDetails != null) {
            defaultSubscriptionOfferDetails = this.convertProductOfferDetails(productStoreDetails.defaultSubscriptionOfferDetails);
        }
        let basePlanSubscriptionOfferDetails = null;
        if (productStoreDetails.basePlanSubscriptionOfferDetails != null) {
            basePlanSubscriptionOfferDetails = this.convertProductOfferDetails(productStoreDetails.basePlanSubscriptionOfferDetails);
        }
        let inAppOfferDetails = null;
        if (productStoreDetails.inAppOfferDetails != null) {
            inAppOfferDetails = this.convertInAppOfferDetails(productStoreDetails.inAppOfferDetails);
        }
        let subscriptionOfferDetails = null;
        if (productStoreDetails.subscriptionOfferDetails != null) {
            subscriptionOfferDetails = productStoreDetails.subscriptionOfferDetails.map(defaultOfferDetail => this.convertProductOfferDetails(defaultOfferDetail));
        }
        const productType = Mapper.convertProductType(productStoreDetails.productType);
        return new ProductStoreDetails((_a = productStoreDetails.basePlanId) !== null && _a !== void 0 ? _a : null, productStoreDetails.productId, productStoreDetails.name, productStoreDetails.title, productStoreDetails.description, subscriptionOfferDetails, defaultSubscriptionOfferDetails, basePlanSubscriptionOfferDetails, inAppOfferDetails, productStoreDetails.hasTrialOffer, productStoreDetails.hasIntroOffer, productStoreDetails.hasTrialOrIntroOffer, productType, productStoreDetails.isInApp, productStoreDetails.isSubscription, productStoreDetails.isPrepaid, productStoreDetails.isInstallment);
    }
    static convertSKProduct(skProduct) {
        var _a;
        let subscriptionPeriod;
        if (skProduct.subscriptionPeriod != null) {
            subscriptionPeriod = this.convertSKSubscriptionPeriod(skProduct.subscriptionPeriod);
        }
        let discount;
        if (skProduct.introductoryPrice) {
            discount = this.convertProductDiscount(skProduct.introductoryPrice);
        }
        let discounts;
        if (Array.isArray(skProduct.discounts) && skProduct.discounts.length) {
            discounts = this.convertDiscounts(skProduct.discounts);
        }
        return new SKProduct(skProduct.localizedDescription, skProduct.localizedTitle, skProduct.price, skProduct.priceLocale.localeIdentifier, skProduct.productIdentifier, !!skProduct.isDownloadable, skProduct.downloadContentVersion, skProduct.downloadContentLengths, subscriptionPeriod, discount, discounts, skProduct.subscriptionGroupIdentifier, skProduct.isFamilyShareable, (_a = skProduct.priceLocale.currencyCode) !== null && _a !== void 0 ? _a : "");
    }
    static convertSKSubscriptionPeriod(subscriptionPeriod) {
        return new SKSubscriptionPeriod(subscriptionPeriod.numberOfUnits, SKPeriodUnit[subscriptionPeriod.unit]);
    }
    static convertProductDiscount(discount) {
        var _a;
        let subscriptionPeriod = undefined;
        if (discount.subscriptionPeriod != null) {
            subscriptionPeriod = this.convertSKSubscriptionPeriod(discount.subscriptionPeriod);
        }
        return new SKProductDiscount(discount.price, discount.priceLocale.localeIdentifier, discount.numberOfPeriods, subscriptionPeriod, SKProductDiscountPaymentMode[discount.paymentMode], discount.identifier, SKProductDiscountType[discount.type], (_a = discount.priceLocale.currencySymbol) !== null && _a !== void 0 ? _a : "");
    }
    static convertDiscounts(discounts) {
        const mappedDiscounts = discounts.map((discount) => {
            return this.convertProductDiscount(discount);
        });
        return mappedDiscounts;
    }
    static convertEligibility(eligibilityMap) {
        let mappedEligibility = new Map();
        if (!eligibilityMap) {
            return mappedEligibility;
        }
        for (const [key, value] of Object.entries(eligibilityMap)) {
            const status = Mapper.convertEligibilityStatus(value.status);
            const eligibilityInfo = new IntroEligibility(status);
            mappedEligibility.set(key, eligibilityInfo);
        }
        return mappedEligibility;
    }
    static convertEligibilityStatus(status) {
        switch (status) {
            case "non_intro_or_trial_product":
                return exports.IntroEligibilityStatus.NON_INTRO_OR_TRIAL_PRODUCT;
            case "intro_or_trial_eligible":
                return exports.IntroEligibilityStatus.ELIGIBLE;
            case "intro_or_trial_ineligible":
                return exports.IntroEligibilityStatus.INELIGIBLE;
            default:
                return exports.IntroEligibilityStatus.UNKNOWN;
        }
    }
    static convertActionResult(payload) {
        return new ActionResult(payload["type"], payload["value"], this.convertQonversionError(payload["error"]));
    }
    static convertQonversionError(payload) {
        if (!payload)
            return undefined;
        const code = this.convertErrorCode(payload["code"]);
        return new QonversionError(code, payload["description"], payload["additionalMessage"], payload["domain"]);
    }
    static convertUserInfo(user) {
        return new User(user.qonversionId, user.identityId);
    }
    static convertRemoteConfig(remoteConfig) {
        var _a;
        let experiment = null;
        if (remoteConfig.experiment) {
            const groupType = this.convertGroupType(remoteConfig.experiment.group.type);
            const group = new ExperimentGroup(remoteConfig.experiment.group.id, remoteConfig.experiment.group.name, groupType);
            experiment = new Experiment(remoteConfig.experiment.id, remoteConfig.experiment.name, group);
        }
        const sourceType = this.convertRemoteConfigurationSourceType(remoteConfig.source.type);
        const assignmentType = this.convertRemoteConfigurationAssignmentType(remoteConfig.source.assignmentType);
        const source = new RemoteConfigurationSource(remoteConfig.source.id, remoteConfig.source.name, sourceType, assignmentType, (_a = remoteConfig.source.contextKey) !== null && _a !== void 0 ? _a : null);
        return new RemoteConfig(remoteConfig.payload, experiment, source);
    }
    static convertRemoteConfigList(remoteConfigList) {
        const remoteConfigs = remoteConfigList.remoteConfigs.map(config => this.convertRemoteConfig(config));
        return new RemoteConfigList(remoteConfigs);
    }
    static convertRemoteConfigurationSourceType(type) {
        switch (type) {
            case "experiment_control_group":
                return exports.RemoteConfigurationSourceType.EXPERIMENT_CONTROL_GROUP;
            case "experiment_treatment_group":
                return exports.RemoteConfigurationSourceType.EXPERIMENT_TREATMENT_GROUP;
            case "remote_configuration":
                return exports.RemoteConfigurationSourceType.REMOTE_CONFIGURATION;
            default:
                return exports.RemoteConfigurationSourceType.UNKNOWN;
        }
    }
    static convertRemoteConfigurationAssignmentType(type) {
        switch (type) {
            case "auto":
                return exports.RemoteConfigurationAssignmentType.AUTO;
            case "manual":
                return exports.RemoteConfigurationAssignmentType.MANUAL;
            default:
                return exports.RemoteConfigurationAssignmentType.UNKNOWN;
        }
    }
    static convertGroupType(type) {
        switch (type) {
            case "control":
                return exports.ExperimentGroupType.CONTROL;
            case "treatment":
                return exports.ExperimentGroupType.TREATMENT;
            default:
                return exports.ExperimentGroupType.UNKNOWN;
        }
    }
    static convertErrorCode(code) {
        switch (code) {
            case exports.QonversionErrorCode.UNKNOWN: return exports.QonversionErrorCode.UNKNOWN;
            case exports.QonversionErrorCode.API_RATE_LIMIT_EXCEEDED: return exports.QonversionErrorCode.API_RATE_LIMIT_EXCEEDED;
            case exports.QonversionErrorCode.APPLE_STORE_ERROR: return exports.QonversionErrorCode.APPLE_STORE_ERROR;
            case exports.QonversionErrorCode.BACKEND_ERROR: return exports.QonversionErrorCode.BACKEND_ERROR;
            case exports.QonversionErrorCode.BILLING_UNAVAILABLE: return exports.QonversionErrorCode.BILLING_UNAVAILABLE;
            case exports.QonversionErrorCode.CLIENT_INVALID: return exports.QonversionErrorCode.CLIENT_INVALID;
            case exports.QonversionErrorCode.CLOUD_SERVICE_NETWORK_CONNECTION_FAILED: return exports.QonversionErrorCode.CLOUD_SERVICE_NETWORK_CONNECTION_FAILED;
            case exports.QonversionErrorCode.CLOUD_SERVICE_PERMISSION_DENIED: return exports.QonversionErrorCode.CLOUD_SERVICE_PERMISSION_DENIED;
            case exports.QonversionErrorCode.CLOUD_SERVICE_REVOKED: return exports.QonversionErrorCode.CLOUD_SERVICE_REVOKED;
            case exports.QonversionErrorCode.FAILED_TO_RECEIVE_DATA: return exports.QonversionErrorCode.FAILED_TO_RECEIVE_DATA;
            case exports.QonversionErrorCode.FEATURE_NOT_SUPPORTED: return exports.QonversionErrorCode.FEATURE_NOT_SUPPORTED;
            case exports.QonversionErrorCode.FRAUD_PURCHASE: return exports.QonversionErrorCode.FRAUD_PURCHASE;
            case exports.QonversionErrorCode.INCORRECT_REQUEST: return exports.QonversionErrorCode.INCORRECT_REQUEST;
            case exports.QonversionErrorCode.INTERNAL_ERROR: return exports.QonversionErrorCode.INTERNAL_ERROR;
            case exports.QonversionErrorCode.INVALID_CLIENT_UID: return exports.QonversionErrorCode.INVALID_CLIENT_UID;
            case exports.QonversionErrorCode.INVALID_CREDENTIALS: return exports.QonversionErrorCode.INVALID_CREDENTIALS;
            case exports.QonversionErrorCode.INVALID_STORE_CREDENTIALS: return exports.QonversionErrorCode.INVALID_STORE_CREDENTIALS;
            case exports.QonversionErrorCode.LAUNCH_ERROR: return exports.QonversionErrorCode.LAUNCH_ERROR;
            case exports.QonversionErrorCode.NETWORK_CONNECTION_FAILED: return exports.QonversionErrorCode.NETWORK_CONNECTION_FAILED;
            case exports.QonversionErrorCode.OFFERINGS_NOT_FOUND: return exports.QonversionErrorCode.OFFERINGS_NOT_FOUND;
            case exports.QonversionErrorCode.PAYMENT_INVALID: return exports.QonversionErrorCode.PAYMENT_INVALID;
            case exports.QonversionErrorCode.PAYMENT_NOT_ALLOWED: return exports.QonversionErrorCode.PAYMENT_NOT_ALLOWED;
            case exports.QonversionErrorCode.PLAY_STORE_ERROR: return exports.QonversionErrorCode.PLAY_STORE_ERROR;
            case exports.QonversionErrorCode.PRIVACY_ACKNOWLEDGEMENT_REQUIRED: return exports.QonversionErrorCode.PRIVACY_ACKNOWLEDGEMENT_REQUIRED;
            case exports.QonversionErrorCode.PRODUCT_ALREADY_OWNED: return exports.QonversionErrorCode.PRODUCT_ALREADY_OWNED;
            case exports.QonversionErrorCode.PRODUCT_NOT_FOUND: return exports.QonversionErrorCode.PRODUCT_NOT_FOUND;
            case exports.QonversionErrorCode.PRODUCT_NOT_OWNED: return exports.QonversionErrorCode.PRODUCT_NOT_OWNED;
            case exports.QonversionErrorCode.PROJECT_CONFIG_ERROR: return exports.QonversionErrorCode.PROJECT_CONFIG_ERROR;
            case exports.QonversionErrorCode.PURCHASE_CANCELED: return exports.QonversionErrorCode.PURCHASE_CANCELED;
            case exports.QonversionErrorCode.PURCHASE_INVALID: return exports.QonversionErrorCode.PURCHASE_INVALID;
            case exports.QonversionErrorCode.PURCHASE_PENDING: return exports.QonversionErrorCode.PURCHASE_PENDING;
            case exports.QonversionErrorCode.PURCHASE_UNSPECIFIED: return exports.QonversionErrorCode.PURCHASE_UNSPECIFIED;
            case exports.QonversionErrorCode.RECEIPT_VALIDATION_ERROR: return exports.QonversionErrorCode.RECEIPT_VALIDATION_ERROR;
            case exports.QonversionErrorCode.REMOTE_CONFIGURATION_NOT_AVAILABLE: return exports.QonversionErrorCode.REMOTE_CONFIGURATION_NOT_AVAILABLE;
            case exports.QonversionErrorCode.RESPONSE_PARSING_FAILED: return exports.QonversionErrorCode.RESPONSE_PARSING_FAILED;
            case exports.QonversionErrorCode.STORE_PRODUCT_NOT_AVAILABLE: return exports.QonversionErrorCode.STORE_PRODUCT_NOT_AVAILABLE;
            case exports.QonversionErrorCode.UNAUTHORIZED_REQUEST_DATA: return exports.QonversionErrorCode.UNAUTHORIZED_REQUEST_DATA;
            case exports.QonversionErrorCode.UNKNOWN_CLIENT_PLATFORM: return exports.QonversionErrorCode.UNKNOWN_CLIENT_PLATFORM;
        }
        return exports.QonversionErrorCode.UNKNOWN;
    }
}

class UserProperty {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.definedKey = Mapper.convertDefinedUserPropertyKey(key);
    }
}

class QonversionConfig {
    constructor(projectKey, launchMode, environment = exports.Environment.PRODUCTION, entitlementsCacheLifetime = exports.EntitlementsCacheLifetime.MONTH, entitlementsUpdateListener = undefined, proxyUrl, kidsMode = false) {
        this.projectKey = projectKey;
        this.launchMode = launchMode;
        this.environment = environment;
        this.entitlementsCacheLifetime = entitlementsCacheLifetime;
        this.entitlementsUpdateListener = entitlementsUpdateListener;
        this.proxyUrl = proxyUrl;
        this.kidsMode = kidsMode;
    }
}

class QonversionConfigBuilder {
    constructor(projectKey, launchMode) {
        this.environment = exports.Environment.PRODUCTION;
        this.entitlementsCacheLifetime = exports.EntitlementsCacheLifetime.MONTH;
        this.entitlementsUpdateListener = undefined;
        this.proxyUrl = undefined;
        this.kidsMode = false;
        this.projectKey = projectKey;
        this.launchMode = launchMode;
    }
    /**
     * Set current application {@link Environment}. Used to distinguish sandbox and production users.
     *
     * @param environment current environment.
     * @return builder instance for chain calls.
     */
    setEnvironment(environment) {
        this.environment = environment;
        return this;
    }
    /**
     * Entitlements cache is used when there are problems with the Qonversion API
     * or internet connection. If so, Qonversion will return the last successfully loaded
     * entitlements. The current method allows you to configure how long that cache may be used.
     * The default value is {@link EntitlementsCacheLifetime.MONTH}.
     *
     * @param lifetime desired entitlements cache lifetime duration
     * @return builder instance for chain calls.
     */
    setEntitlementsCacheLifetime(lifetime) {
        this.entitlementsCacheLifetime = lifetime;
        return this;
    }
    /**
     * Provide a listener to be notified about asynchronous user entitlements updates.
     *
     * Make sure you provide this listener for being up-to-date with the user entitlements.
     * Else you can lose some important updates. Also, please, consider that this listener
     * should live for the whole lifetime of the application.
     *
     * @param entitlementsUpdateListener listener to be called when entitlements update.
     * @return builder instance for chain calls.
     */
    setEntitlementsUpdateListener(entitlementsUpdateListener) {
        this.entitlementsUpdateListener = entitlementsUpdateListener;
        return this;
    }
    /**
     * Provide a URL to your proxy server which will redirect all the requests from the app
     * to our API. Please, contact us before using this feature.
     *
     * @param url your proxy server url
     * @return builder instance for chain calls.
     * @see [The documentation](https://documentation.qonversion.io/docs/custom-proxy-server-for-sdks)
     */
    setProxyURL(url) {
        this.proxyUrl = url;
        return this;
    }
    /**
     * Android only.
     * Use this function to enable Qonversion SDK Kids mode.
     * With this mode activated, our SDK does not collect any information that violates Google Children’s Privacy Policy.
     * @return builder instance for chain calls.
     */
    enableKidsMode() {
        this.kidsMode = true;
        return this;
    }
    /**
     * Generate {@link QonversionConfig} instance with all the provided configurations.
     *
     * @return the complete {@link QonversionConfig} instance.
     */
    build() {
        return new QonversionConfig(this.projectKey, this.launchMode, this.environment, this.entitlementsCacheLifetime, this.entitlementsUpdateListener, this.proxyUrl, this.kidsMode);
    }
}

class PurchaseOptions {
    constructor(offerId, applyOffer, oldProduct, updatePolicy, contextKeys, quantity) {
        this.offerId = offerId;
        this.applyOffer = applyOffer;
        this.oldProduct = oldProduct;
        this.updatePolicy = updatePolicy;
        this.contextKeys = contextKeys;
        this.quantity = quantity;
    }
}

class PurchaseOptionsBuilder {
    constructor() {
        this.offerId = null;
        this.applyOffer = true;
        this.oldProduct = null;
        this.updatePolicy = null;
        this.contextKeys = null;
        this.quantity = 1;
    }
    /**
     * iOS only.
     * Set quantity of product purchasing. Use for consumable in-app products.
     * @param quantity of product purchasing.
     * @return builder instance for chain calls.
     */
    setQuantity(quantity) {
        this.quantity = quantity;
        return this;
    }
    /**
     * Android only.
     * Set offer for the purchase.
     * If offer is not specified, then the default offer will be applied. To know how we choose
     * the default offer, see {@link ProductStoreDetails.defaultSubscriptionOfferDetails}.
     * @param offer concrete offer which you'd like to purchase.
     * @return builder instance for chain calls.
     */
    setOffer(offer) {
        this.offerId = offer.offerId;
        return this;
    }
    /**
     * Android only.
     * Set the offer Id to the purchase.
     * If {@link offerId} is not specified, then the default offer will be applied. To know how we choose
     * the default offer, see {@link ProductStoreDetails.defaultSubscriptionOfferDetails}.
     * @param offerId concrete offer Id which you'd like to purchase.
     * @return builder instance for chain calls.
     */
    setOfferId(offerId) {
        this.offerId = offerId;
        return this;
    }
    /**
     * Android only.
     * Call this function to remove any intro/trial offer from the purchase (use only a bare base plan).
     * @return builder instance for chain calls.
     */
    removeOffer() {
        this.applyOffer = false;
        return this;
    }
    /**
     * Android only.
     * Set Qonversion product from which the upgrade/downgrade will be initialized.
     *
     * @param oldProduct Qonversion product from which the upgrade/downgrade
     * will be initialized.
     * @return builder instance for chain calls.
     */
    setOldProduct(oldProduct) {
        this.oldProduct = oldProduct;
        return this;
    }
    /**
     * Android only.
     * Set the update policy for the purchase.
     * If the {@link updatePolicy} is not provided, then default one
     * will be selected - {@link PurchaseUpdatePolicy.WITH_TIME_PRORATION}.
     * @param updatePolicy update policy for the purchase.
     * @return builder instance for chain calls.
     */
    setUpdatePolicy(updatePolicy) {
        this.updatePolicy = updatePolicy;
        return this;
    }
    /**
     * Set the context keys associated with a purchase.
     *
     * @param contextKeys context keys for the purchase.
     * @return builder instance for chain calls.
     */
    setContextKeys(contextKeys) {
        this.contextKeys = contextKeys;
        return this;
    }
    /**
     * Generate {@link PurchaseOptions} instance with all the provided options.
     * @return the complete {@link PurchaseOptions} instance.
     */
    build() {
        return new PurchaseOptions(this.offerId, this.applyOffer, this.oldProduct, this.updatePolicy, this.contextKeys, this.quantity);
    }
}

const Qonversion = core.registerPlugin('Qonversion', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.QonversionWeb()),
});

class QonversionWeb extends core.WebPlugin {
    attachUserToExperiment(experimentId, groupId) {
        throw this.unimplemented("not implemented yet");
    }
    attachUserToRemoteConfiguration(remoteConfigurationId) {
        throw this.unimplemented("not implemented yet");
    }
    attribution(data, provider) {
    }
    checkEntitlements() {
        throw this.unimplemented("not implemented yet");
    }
    checkTrialIntroEligibility(ids) {
        throw this.unimplemented("not implemented yet");
    }
    collectAdvertisingId() {
    }
    collectAppleSearchAdsAttribution() {
    }
    detachUserFromExperiment(experimentId) {
        throw this.unimplemented("not implemented yet");
    }
    detachUserFromRemoteConfiguration(remoteConfigurationId) {
        throw this.unimplemented("not implemented yet");
    }
    identify(userID) {
        throw this.unimplemented("not implemented yet");
    }
    isFallbackFileAccessible() {
        throw this.unimplemented("not implemented yet");
    }
    logout() {
    }
    offerings() {
        throw this.unimplemented("not implemented yet");
    }
    presentCodeRedemptionSheet() {
    }
    products() {
        throw this.unimplemented("not implemented yet");
    }
    purchase(purchaseModel) {
        throw this.unimplemented("not implemented yet");
    }
    purchaseProduct(product, options) {
        throw this.unimplemented("not implemented yet");
    }
    remoteConfig(contextKey) {
        throw this.unimplemented("not implemented yet");
    }
    remoteConfigList() {
        throw this.unimplemented("not implemented yet");
    }
    remoteConfigListForContextKeys(contextKeys, includeEmptyContextKey) {
        throw this.unimplemented("not implemented yet");
    }
    restore() {
        throw this.unimplemented("not implemented yet");
    }
    setCustomUserProperty(key, value) {
    }
    setEntitlementsUpdateListener(listener) {
    }
    setPromoPurchasesDelegate(delegate) {
    }
    setUserProperty(key, value) {
    }
    syncHistoricalData() {
    }
    syncPurchases() {
    }
    syncStoreKit2Purchases() {
    }
    updatePurchase(purchaseUpdateModel) {
        throw this.unimplemented("not implemented yet");
    }
    userInfo() {
        throw this.unimplemented("not implemented yet");
    }
    userProperties() {
        throw this.unimplemented("not implemented yet");
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    QonversionWeb: QonversionWeb
});

exports.ActionResult = ActionResult;
exports.Entitlement = Entitlement;
exports.Experiment = Experiment;
exports.ExperimentGroup = ExperimentGroup;
exports.IntroEligibility = IntroEligibility;
exports.Offering = Offering;
exports.OfferingTag = OfferingTag;
exports.Offerings = Offerings;
exports.Product = Product;
exports.ProductInAppDetails = ProductInAppDetails;
exports.ProductInstallmentPlanDetails = ProductInstallmentPlanDetails;
exports.ProductOfferDetails = ProductOfferDetails;
exports.ProductPrice = ProductPrice;
exports.ProductPricingPhase = ProductPricingPhase;
exports.ProductStoreDetails = ProductStoreDetails;
exports.PurchaseModel = PurchaseModel;
exports.PurchaseOptions = PurchaseOptions;
exports.PurchaseOptionsBuilder = PurchaseOptionsBuilder;
exports.PurchaseUpdateModel = PurchaseUpdateModel;
exports.Qonversion = Qonversion;
exports.QonversionConfig = QonversionConfig;
exports.QonversionConfigBuilder = QonversionConfigBuilder;
exports.QonversionError = QonversionError;
exports.RemoteConfig = RemoteConfig;
exports.RemoteConfigList = RemoteConfigList;
exports.RemoteConfigurationSource = RemoteConfigurationSource;
exports.SKPeriodUnit = SKPeriodUnit;
exports.SKProduct = SKProduct;
exports.SKProductDiscount = SKProductDiscount;
exports.SKProductDiscountPaymentMode = SKProductDiscountPaymentMode;
exports.SKProductDiscountType = SKProductDiscountType;
exports.SKSubscriptionPeriod = SKSubscriptionPeriod;
exports.SkuDetails = SkuDetails;
exports.SubscriptionPeriod = SubscriptionPeriod;
exports.Transaction = Transaction;
exports.User = User;
exports.UserProperties = UserProperties;
exports.UserProperty = UserProperty;
//# sourceMappingURL=plugin.cjs.js.map
