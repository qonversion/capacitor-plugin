import { WebPlugin } from '@capacitor/core';
export class QonversionWeb extends WebPlugin {
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
//# sourceMappingURL=web.js.map