import {WebPlugin} from '@capacitor/core';
import {QonversionNativePlugin} from '../QonversionNativePlugin';
import {
    QEntitlement,
    QOfferings,
    QProduct,
    QRemoteConfig,
    QRemoteConfigList,
    QTrialIntroEligibility,
    QUser,
    QUserProperties
} from './Mapper';

export class QonversionWeb extends WebPlugin implements QonversionNativePlugin {
    addAttributionData(params: { data: Object; provider: string }): void {
        throw this.unimplemented("not implemented yet");
    }

    attachUserToExperiment(params: { experimentId: string; groupId: string }): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    attachUserToRemoteConfiguration(params: { remoteConfigurationId: string }): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    checkEntitlements(): Promise<Record<string, QEntitlement> | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    checkTrialIntroEligibility(params: {
        ids: string[]
    }): Promise<QTrialIntroEligibility | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    collectAdvertisingId(): void {
        throw this.unimplemented("not implemented yet");
    }

    collectAppleSearchAdsAttribution(): void {
        throw this.unimplemented("not implemented yet");
    }

    detachUserFromExperiment(params: { experimentId: string }): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    detachUserFromRemoteConfiguration(params: { remoteConfigurationId: string }): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    identify(params: { userId: string }): Promise<QUser> {
        throw this.unimplemented("not implemented yet");
    }

    initialize(params: {
        projectKey: string;
        launchMode: string;
        environment: string;
        entitlementsCacheLifetime: string;
        proxyUrl: string | undefined;
        kidsMode: boolean
    }): void {
        throw this.unimplemented("not implemented yet");
    }

    isFallbackFileAccessible(): Promise<{ success: boolean }> {
        throw this.unimplemented("not implemented yet");
    }

    logout(): void {
        throw this.unimplemented("not implemented yet");
    }

    offerings(): Promise<QOfferings | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    presentCodeRedemptionSheet(): void {
        throw this.unimplemented("not implemented yet");
    }

    products(): Promise<Record<string, QProduct> | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    promoPurchase(params: { productId: string }): Promise<Record<string, QEntitlement> | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    purchase(params: {
        productId: string;
        quantity?: number;
        contextKeys: string[] | null;
        offerId?: string | null | undefined;
        applyOffer?: boolean | undefined;
        oldProductId?: string | undefined;
        updatePolicyKey?: string | null | undefined
    }): Promise<Record<string, QEntitlement> | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    remoteConfig(params: { contextKey: string | undefined }): Promise<QRemoteConfig> {
        throw this.unimplemented("not implemented yet");
    }

    remoteConfigList(params?: { contextKeys: string[]; includeEmptyContextKey: boolean }): Promise<QRemoteConfigList> {
        throw this.unimplemented("not implemented yet");
    }

    restore(): Promise<Record<string, QEntitlement> | null | undefined> {
        throw this.unimplemented("not implemented yet");
    }

    setCustomProperty(param: { property: string; value: string }): void {
        throw this.unimplemented("not implemented yet");
    }

    setDefinedProperty(param: { property: string; value: string }): void {
        throw this.unimplemented("not implemented yet");
    }

    storeSdkInfo(params: { source: string; version: string }): void {
        throw this.unimplemented("not implemented yet");
    }

    syncHistoricalData(): void {
        throw this.unimplemented("not implemented yet");
    }

    syncPurchases(): void {
        throw this.unimplemented("not implemented yet");
    }

    syncStoreKit2Purchases(): void {
        throw this.unimplemented("not implemented yet");
    }

    userInfo(): Promise<QUser> {
        throw this.unimplemented("not implemented yet");
    }

    userProperties(): Promise<QUserProperties> {
        throw this.unimplemented("not implemented yet");
    }
}
