import { WebPlugin } from '@capacitor/core';
import {Product} from "./dto/Product";
import {PurchaseOptions} from "./dto/PurchaseOptions";
import {Entitlement} from "./dto/Entitlement";
import {PurchaseModel} from "./dto/PurchaseModel";
import {PurchaseUpdateModel} from "./dto/PurchaseUpdateModel";
import {Offerings} from "./dto/Offerings";
import {IntroEligibility} from "./dto/IntroEligibility";
import {User} from "./dto/User";
import {RemoteConfig} from "./dto/RemoteConfig";
import {RemoteConfigList} from "./dto/RemoteConfigList";
import {AttributionProvider, UserPropertyKey} from "./dto/enums";
import {UserProperties} from "./dto/UserProperties";
import {EntitlementsUpdateListener} from "./dto/EntitlementsUpdateListener";
import {PromoPurchasesListener} from "./dto/PromoPurchasesListener";

import type { QonversionPlugin } from './definitions';

export class QonversionWeb extends WebPlugin implements QonversionPlugin {
    attachUserToExperiment (experimentId: string, groupId: string): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    attachUserToRemoteConfiguration (remoteConfigurationId: string): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    attribution (data: Object, provider: AttributionProvider): void {
    }

    checkEntitlements (): Promise<Map<string, Entitlement>> {
        throw this.unimplemented("not implemented yet");
    }

    checkTrialIntroEligibility (ids: string[]): Promise<Map<string, IntroEligibility>> {
        throw this.unimplemented("not implemented yet");
    }

    collectAdvertisingId (): void {
    }

    collectAppleSearchAdsAttribution (): void {
    }

    detachUserFromExperiment (experimentId: string): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    detachUserFromRemoteConfiguration (remoteConfigurationId: string): Promise<void> {
        throw this.unimplemented("not implemented yet");
    }

    identify (userID: string): Promise<User> {
        throw this.unimplemented("not implemented yet");
    }

    isFallbackFileAccessible (): Promise<Boolean> {
        throw this.unimplemented("not implemented yet");
    }

    logout (): void {
    }

    offerings (): Promise<Offerings | null> {
        throw this.unimplemented("not implemented yet");
    }

    presentCodeRedemptionSheet (): void {
    }

    products (): Promise<Map<string, Product>> {
        throw this.unimplemented("not implemented yet");
    }

    purchase (purchaseModel: PurchaseModel): Promise<Map<string, Entitlement>> {
        throw this.unimplemented("not implemented yet");
    }

    purchaseProduct (product: Product, options: PurchaseOptions): Promise<Map<string, Entitlement>> {
        throw this.unimplemented("not implemented yet");
    }

    remoteConfig (contextKey: string | undefined): Promise<RemoteConfig> {
        throw this.unimplemented("not implemented yet");
    }

    remoteConfigList (): Promise<RemoteConfigList> {
        throw this.unimplemented("not implemented yet");
    }

    remoteConfigListForContextKeys (contextKeys: Array<string>, includeEmptyContextKey: boolean): Promise<RemoteConfigList> {
        throw this.unimplemented("not implemented yet");
    }

    restore (): Promise<Map<string, Entitlement>> {
        throw this.unimplemented("not implemented yet");
    }

    setCustomUserProperty (key: string, value: string): void {
    }

    setEntitlementsUpdateListener (listener: EntitlementsUpdateListener): void {
    }

    setPromoPurchasesDelegate (delegate: PromoPurchasesListener): void {
    }

    setUserProperty (key: UserPropertyKey, value: string): void {
    }

    syncHistoricalData (): void {
    }

    syncPurchases (): void {
    }

    syncStoreKit2Purchases (): void {
    }

    updatePurchase (purchaseUpdateModel: PurchaseUpdateModel): Promise<Map<string, Entitlement> | null> {
        throw this.unimplemented("not implemented yet");
    }

    userInfo (): Promise<User> {
        throw this.unimplemented("not implemented yet");
    }

    userProperties (): Promise<UserProperties> {
        throw this.unimplemented("not implemented yet");
    }
}
