import {
  AttributionProvider,
  EntitlementsCacheLifetime,
  Environment,
  LaunchMode,
  PurchaseOptionsBuilder,
  Qonversion,
  QonversionConfigBuilder,
  UserPropertyKey
} from "@qonversion/capacitor-plugin";

window.initializeSdk = () => {
  const config = new QonversionConfigBuilder(
    'PV77YHL7qnGvsdmpTs7gimsxUvY-Znl2',
    LaunchMode.SUBSCRIPTION_MANAGEMENT,
  )
    .setEnvironment(Environment.SANDBOX)
    .setEntitlementsCacheLifetime(EntitlementsCacheLifetime.MONTH)
    .setEntitlementsUpdateListener({
      onEntitlementsUpdated(entitlements) {
        console.log('Entitlements updated!', entitlements);
      },
    })
    .build();
  Qonversion.initialize(config);
}

window.purchase = async () => {
  const productId = document.getElementById('product-id').value;
  const offerId = document.getElementById('offer-id').value;
  const products = await Qonversion.getSharedInstance().products();
  const product = products.get(productId);
  try {
    const purchaseOptions = !!offerId ? new PurchaseOptionsBuilder().setOfferId(offerId) : undefined;
    const entitlements = await Qonversion.getSharedInstance().purchaseProduct(product, purchaseOptions);
    console.log('Qonversion purchase:', entitlements, productId);
  } catch (e) {
    console.log('Qonversion purchase failed', e);
  }
}

window.getProducts = async () => {
  const products = await Qonversion.getSharedInstance().products();
  console.log('Qonversion products:', products);
}

window.getPromoOffer = async () => {
  const productId = document.getElementById('product-id-promo').value;
  const discountId = document.getElementById('discount-id-promo').value;
  const products = await Qonversion.getSharedInstance().products();

  const product = products.get(productId);
  if (!product) {
    console.log('Qonversion product not found: ', productId);
    return;
  }

  const discount = product.skProduct.discounts.find(discount => discount.identifier === discountId);
  if (!discount) {
    console.log('Qonversion discount not found for requested product: ', discountId);
    return;
  }

  try {
    const promoOffer = await Qonversion.getSharedInstance().getPromotionalOffer(product, discount);
    console.log('Qonversion getPromotionalOffer:', promoOffer);
  } catch (e) {
    console.log('Qonversion getPromotionalOffer failed', e);
  }
}

window.getRemoteConfig = async () => {
  const contextKey = document.getElementById('context-key').value;
  const key = contextKey?.length > 0 ? contextKey : undefined;
  const remoteConfig = await Qonversion.getSharedInstance().remoteConfig(key);
  console.log('Qonversion remote config:', remoteConfig, key);
}

window.getRemoteConfigList = async () => {
  const contextKeys = document.getElementById('context-keys').value;
  if (contextKeys?.length > 0) {
    const keys = contextKeys.split(', ');
    const remoteConfigList = await Qonversion.getSharedInstance().remoteConfigListForContextKeys(keys, true);
    console.log('Qonversion remote config list:', remoteConfigList, keys);
  } else {
    const remoteConfigList = await Qonversion.getSharedInstance().remoteConfigList();
    console.log('Qonversion remote config list:', remoteConfigList);
  }
}

window.attachUserToExperiment = async () => {
  const experimentId = document.getElementById('attach-experiment-id').value;
  const groupId = document.getElementById('attach-group-id').value;

  await Qonversion.getSharedInstance().attachUserToExperiment(experimentId, groupId);
  console.log('Qonversion attachUserToExperiment');
}

window.detachUserFromExperiment = async () => {
  const experimentId = document.getElementById('detach-experiment-id').value;

  await Qonversion.getSharedInstance().detachUserFromExperiment(experimentId);
  console.log('Qonversion detachUserFromExperiment');
}

window.attachUserToRemoteConfiguration = async () => {
  const remoteConfigurationId = document.getElementById('attach-config-id').value;

  await Qonversion.getSharedInstance().attachUserToRemoteConfiguration(remoteConfigurationId);
  console.log('Qonversion attachUserToRemoteConfiguration');
}

window.detachUserFromRemoteConfiguration = async () => {
  const remoteConfigurationId = document.getElementById('detach-config-id').value;

  await Qonversion.getSharedInstance().detachUserFromRemoteConfiguration(remoteConfigurationId);
  console.log('Qonversion detachUserFromRemoteConfiguration');
}

window.isFallbackFileAccessible = async () => {
  const res = await Qonversion.getSharedInstance().isFallbackFileAccessible();
  console.log('Qonversion isFallbackFileAccessible', res);
}

window.getOfferings = async () => {
  const offerings = await Qonversion.getSharedInstance().offerings();
  console.log('Qonversion offerings:', offerings);
}

window.checkTrialIntroEligibility = async () => {
  const productIds = document.getElementById('product-ids').value;
  const ids = productIds.split(', ');
  const eligibilities = await Qonversion.getSharedInstance().checkTrialIntroEligibility(ids);
  console.log('Qonversion checkTrialIntroEligibility:', eligibilities, ids);
}

window.checkEntitlements = async () => {
  try {
    const entitlements = await Qonversion.getSharedInstance().checkEntitlements();
    console.log('Qonversion checkEntitlements:', entitlements);
  } catch (e) {
    console.log('Qonversion checkEntitlements failed', e);
  }
}

window.restore = async () => {
  try {
    const entitlements = await Qonversion.getSharedInstance().restore();
    console.log('Qonversion restore:', entitlements);
  } catch (e) {
    console.log('Qonversion restore failed', e);
  }
}

window.syncPurchases = async () => {
  await Qonversion.getSharedInstance().syncPurchases();
  console.log('Qonversion syncPurchases');
}

window.syncHistoricalData = async () => {
  await Qonversion.getSharedInstance().syncHistoricalData();
  console.log('Qonversion syncHistoricalData');
}

window.syncStoreKit2Purchases = async () => {
  await Qonversion.getSharedInstance().syncStoreKit2Purchases();
  console.log('Qonversion syncHistoricalData');
}

window.identify = async () => {
  const userId = document.getElementById('user-id').value;
  const user = await Qonversion.getSharedInstance().identify(userId);
  console.log('Qonversion identify', user);
}

window.logout = () => {
  Qonversion.getSharedInstance().logout();
  console.log('Qonversion logout');
}

window.userInfo = async () => {
  const userInfo = await Qonversion.getSharedInstance().userInfo();
  console.log('Qonversion userInfo', userInfo);
}

window.attribution = () => {
  const data = {
    a: 'aaaa',
    b: {
      c: 25.52,
    },
    d: null
  };
  const provider = AttributionProvider.APPSFLYER;
  Qonversion.getSharedInstance().attribution(data, provider);
  console.log('Qonversion attribution', data, provider);
}

window.setUserProperty = () => {
  Qonversion.getSharedInstance().setUserProperty(UserPropertyKey.ADVERTISING_ID, "testAdId");
  console.log('Qonversion setProperty');
}

window.setCustomUserProperty = () => {
  Qonversion.getSharedInstance().setCustomUserProperty("test_property", "test prop value");
  console.log('Qonversion setUserProperty');
}

window.userProperties = async () => {
  const properties = await Qonversion.getSharedInstance().userProperties();
  console.log('Qonversion properties', properties);
}

window.setEntitlementsUpdateListener = () => {
  Qonversion.getSharedInstance().setEntitlementsUpdateListener({
    onEntitlementsUpdated(entitlements) {
      console.log('Entitlements updated!', entitlements);
    },
  });
  console.log('Qonversion setEntitlementsUpdateListener');
}

window.collectAdvertisingId = () => {
  Qonversion.getSharedInstance().collectAdvertisingId();
  console.log('Qonversion collectAdvertisingId');
}

window.collectAppleSearchAdsAttribution = () => {
  Qonversion.getSharedInstance().collectAppleSearchAdsAttribution();
  console.log('Qonversion collectAppleSearchAdsAttribution');
}

window.setPromoPurchasesDelegate = () => {
  Qonversion.getSharedInstance().setPromoPurchasesDelegate({
    onPromoPurchaseReceived(productId, promoPurchaseExecutor) {
      console.log('Promo purchase received!', productId);
      promoPurchaseExecutor();
    },
  });
  console.log('Qonversion setPromoPurchasesDelegate');
}

window.presentCodeRedemptionSheet = () => {
  Qonversion.getSharedInstance().presentCodeRedemptionSheet();
  console.log('Qonversion presentCodeRedemptionSheet');
}
