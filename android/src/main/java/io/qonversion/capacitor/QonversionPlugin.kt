package io.qonversion.capacitor

import android.app.Activity
import android.app.Application
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import io.qonversion.sandwich.ActivityProvider
import io.qonversion.sandwich.QonversionEventsListener
import io.qonversion.sandwich.QonversionSandwich
import io.qonversion.sandwich.BridgeData

private const val EntitlementsUpdatedEvent = "entitlementsUpdatedEvent"

@CapacitorPlugin(name = "Qonversion")
class QonversionPlugin : Plugin() {
    private val qonversionSandwich by lazy {
        (context?.applicationContext as? Application)?.let {
            QonversionSandwich(
                it,
                object : ActivityProvider {
                    override val currentActivity: Activity?
                        get() = activity
                },
                qonversionEventsListener
            )
        } ?: throw IllegalStateException("Failed to initialize Qonversion Sandwich. Application is null.")
    }

    private val qonversionEventsListener: QonversionEventsListener = object :
        QonversionEventsListener {
        override fun onEntitlementsUpdated(entitlements: BridgeData) {
            notifyListeners(EntitlementsUpdatedEvent, entitlements.toJSObject())
        }
    }

    @PluginMethod
    fun initialize(call: PluginCall) {
        val context = context?.applicationContext ?: return call.reject("Can't get application context for Qonversion initialization", "InitializationError")
        val projectKey = call.getString("projectKey") ?: return call.noNecessaryDataError("projectKey")
        val launchModeKey = call.getString("launchMode") ?: return call.noNecessaryDataError("launchMode")
        val environmentKey = call.getString("environment") ?: return call.noNecessaryDataError("environment")
        val entitlementsCacheLifetimeKey = call.getString("entitlementsCacheLifetime") ?: return call.noNecessaryDataError("entitlementsCacheLifetime")
        val proxyUrl = call.getString("proxyUrl")
        val kidsMode = call.getBoolean("kidsMode") ?: false
        qonversionSandwich.initialize(context, projectKey, launchModeKey, environmentKey, entitlementsCacheLifetimeKey, proxyUrl, kidsMode)
        call.resolve()
    }

    @PluginMethod
    fun identify(call: PluginCall) {
        val userId = call.getString("userId") ?: return call.noNecessaryDataError("userId")

        qonversionSandwich.identify(userId, call.toResultListener())
    }

    @PluginMethod
    fun logout(call: PluginCall) {
        qonversionSandwich.logout()
        call.resolve()
    }

    @PluginMethod
    fun purchase(call: PluginCall) {
        val productId = call.getString("productId") ?: return call.noNecessaryDataError("productId")
        val oldProductId = call.getString("oldProductId")
        val offerId = call.getString("offerId")
        val applyOffer = call.getBoolean("applyOffer")
        val updatePolicyKey = call.getString("updatePolicyKey")
        val contextKeys = call.getArray("contextKeys")?.toList<String>()

        qonversionSandwich.purchase(
            productId,
            offerId,
            applyOffer,
            oldProductId,
            updatePolicyKey,
            contextKeys,
            call.toResultListener()
        )
    }

    @PluginMethod
    fun updatePurchase(call: PluginCall) {
        purchase(call)
    }

    @PluginMethod
    fun checkEntitlements(call: PluginCall) {
        qonversionSandwich.checkEntitlements(call.toResultListener())
    }

    @PluginMethod
    fun restore(call: PluginCall) {
        qonversionSandwich.restore(call.toResultListener())
    }

    @PluginMethod
    fun offerings(call: PluginCall) {
        qonversionSandwich.offerings(call.toResultListener())
    }

    @PluginMethod
    fun userProperties(call: PluginCall) {
        qonversionSandwich.userProperties(call.toResultListener())
    }

    @PluginMethod
    fun isFallbackFileAccessible(call: PluginCall) {
        qonversionSandwich.isFallbackFileAccessible(call.toResultListener())
    }

    @PluginMethod
    fun remoteConfig(call: PluginCall) {
        val contextKey = call.getString("contextKey")
        qonversionSandwich.remoteConfig(contextKey, call.toResultListener())
    }

    @PluginMethod
    fun remoteConfigList(call: PluginCall) {
        val contextKeys = call.getArray("contextKeys").toList<String>()

        if (contextKeys == null) {
            qonversionSandwich.remoteConfigList(call.toResultListener())
        } else {
            val includeEmptyContextKey = call.getBoolean("includeEmptyContextKey") ?: return call.noNecessaryDataError("includeEmptyContextKey")

            qonversionSandwich.remoteConfigList(contextKeys, includeEmptyContextKey, call.toResultListener())
        }
    }

    @PluginMethod
    fun syncHistoricalData(call: PluginCall) {
        qonversionSandwich.syncHistoricalData()
        call.resolve()
    }

    @PluginMethod
    fun products(call: PluginCall) {
        qonversionSandwich.products(call.toResultListener())
    }

    @PluginMethod
    fun setDefinedUserProperty(call: PluginCall) {
        val rawProperty = call.getString("property") ?: return call.noNecessaryDataError("property")
        val value = call.getString("value") ?: return call.noNecessaryDataError("value")

        qonversionSandwich.setDefinedProperty(rawProperty, value)
        call.resolve()
    }

    @PluginMethod
    fun setCustomUserProperty(call: PluginCall) {
        val property = call.getString("property") ?: return call.noNecessaryDataError("property")
        val value = call.getString("value") ?: return call.noNecessaryDataError("value")

        qonversionSandwich.setCustomProperty(property, value)
        call.resolve()
    }

    @PluginMethod
    fun syncPurchases(call: PluginCall) {
        qonversionSandwich.syncPurchases()
        call.resolve()
    }

    @PluginMethod
    fun addAttributionData(call: PluginCall) {
        @Suppress("UNCHECKED_CAST")
        val data = call.getObject("data") as? Map<String, Any> ?: return call.noNecessaryDataError("data")

        if (data.isEmpty()) {
            return call.noNecessaryDataError("data")
        }

        val provider = call.getString("provider") ?: return call.noNecessaryDataError("provider")

        qonversionSandwich.addAttributionData(provider, data)
        call.resolve()
    }

    @PluginMethod
    fun checkTrialIntroEligibility(call: PluginCall) {
        val ids = call.getArray("ids")?.toList<String>() ?: return call.noNecessaryDataError("ids")

        qonversionSandwich.checkTrialIntroEligibility(ids, call.toResultListener())
    }

    @PluginMethod
    fun attachUserToExperiment(call: PluginCall) {
        val experimentId = call.getString("experimentId") ?: return call.noNecessaryDataError("experimentId")
        val groupId = call.getString("groupId") ?: return call.noNecessaryDataError("groupId")

        qonversionSandwich.attachUserToExperiment(experimentId, groupId, call.toResultListener())
    }

    @PluginMethod
    fun detachUserFromExperiment(call: PluginCall) {
        val experimentId = call.getString("experimentId") ?: return call.noNecessaryDataError("experimentId")

        qonversionSandwich.detachUserFromExperiment(experimentId, call.toResultListener())
    }

    @PluginMethod
    fun attachUserToRemoteConfiguration(call: PluginCall) {
        val remoteConfigurationId = call.getString("remoteConfigurationId") ?: return call.noNecessaryDataError("remoteConfigurationId")

        qonversionSandwich.attachUserToRemoteConfiguration(remoteConfigurationId, call.toResultListener())
    }

    @PluginMethod
    fun detachUserFromRemoteConfiguration(call: PluginCall) {
        val remoteConfigurationId = call.getString("remoteConfigurationId") ?: return call.noNecessaryDataError("remoteConfigurationId")

        qonversionSandwich.detachUserFromRemoteConfiguration(remoteConfigurationId, call.toResultListener())
    }

    @PluginMethod
    fun userInfo(call: PluginCall) {
        qonversionSandwich.userInfo(call.toResultListener())
    }

    @PluginMethod
    fun storeSdkInfo(call: PluginCall) {
        val version = call.getString("version") ?: return call.noNecessaryDataError("version")
        val source = call.getString("source") ?: return call.noNecessaryDataError("source")

        qonversionSandwich.storeSdkInfo(source, version)
        call.resolve()
    }
}
