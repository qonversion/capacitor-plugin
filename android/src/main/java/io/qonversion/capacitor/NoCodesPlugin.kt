package io.qonversion.capacitor

import android.app.Activity
import android.app.Application
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import io.qonversion.sandwich.ActivityProvider
import io.qonversion.sandwich.BridgeData
import io.qonversion.sandwich.NoCodesEventListener
import io.qonversion.sandwich.NoCodesPurchaseDelegateBridge
import io.qonversion.sandwich.NoCodesSandwich

private const val NoCodesEventName = "noCodesEvent"
private const val NoCodesPurchaseEventName = "noCodesPurchase"
private const val NoCodesRestoreEventName = "noCodesRestore"

@CapacitorPlugin(name = "NoCodes")
class NoCodesPlugin : Plugin() {
    private val noCodesSandwich by lazy {
        NoCodesSandwich()
    }

    private val noCodesEventListener = object : NoCodesEventListener {
        override fun onNoCodesEvent(event: NoCodesEventListener.Event, payload: BridgeData?) {
            val eventData = JSObject().apply {
                put("name", event.key)
                put("payload", payload?.toJSObject() ?: JSObject())
            }
            notifyListeners(NoCodesEventName, eventData)
        }
    }

    private val purchaseDelegateBridge = object : NoCodesPurchaseDelegateBridge {
        override fun purchase(product: BridgeData) {
            notifyListeners(NoCodesPurchaseEventName, product.toJSObject())
        }

        override fun restore() {
            notifyListeners(NoCodesRestoreEventName, JSObject())
        }
    }

    @PluginMethod
    fun initialize(call: PluginCall) {
        val context = context?.applicationContext
            ?: return call.reject("Can't get application context for NoCodes initialization", "InitializationError")
        val projectKey = call.getString("projectKey")
            ?: return call.noNecessaryDataError("projectKey")

        val proxyUrl = call.getString("proxyUrl")
        val locale = call.getString("locale")

        noCodesSandwich.initialize(context, projectKey, proxyUrl, locale = locale)
        noCodesSandwich.setDelegate(noCodesEventListener)

        val source = call.getString("source")
        val version = call.getString("version")
        if (source != null && version != null) {
            noCodesSandwich.storeSdkInfo(context, source, version)
        }

        call.resolve()
    }

    @PluginMethod
    fun setScreenPresentationConfig(call: PluginCall) {
        val configData = call.getObject("configData")?.toMap()
            ?: return call.noNecessaryDataError("configData")
        val contextKey = call.getString("contextKey")

        noCodesSandwich.setScreenPresentationConfig(configData, contextKey)
        call.resolve()
    }

    @PluginMethod
    fun showScreen(call: PluginCall) {
        val contextKey = call.getString("contextKey")
            ?: return call.noNecessaryDataError("contextKey")

        noCodesSandwich.showScreen(contextKey)
        call.resolve()
    }

    @PluginMethod
    fun close(call: PluginCall) {
        noCodesSandwich.close()
        call.resolve()
    }

    @PluginMethod
    fun setLocale(call: PluginCall) {
        val locale = call.getString("locale")
        noCodesSandwich.setLocale(locale)
        call.resolve()
    }

    @PluginMethod
    fun setPurchaseDelegate(call: PluginCall) {
        noCodesSandwich.setPurchaseDelegate(purchaseDelegateBridge)
        call.resolve()
    }

    @PluginMethod
    fun delegatedPurchaseCompleted(call: PluginCall) {
        noCodesSandwich.delegatedPurchaseCompleted()
        call.resolve()
    }

    @PluginMethod
    fun delegatedPurchaseFailed(call: PluginCall) {
        val errorMessage = call.getString("errorMessage")
            ?: return call.noNecessaryDataError("errorMessage")

        noCodesSandwich.delegatedPurchaseFailed(errorMessage)
        call.resolve()
    }

    @PluginMethod
    fun delegatedRestoreCompleted(call: PluginCall) {
        noCodesSandwich.delegatedRestoreCompleted()
        call.resolve()
    }

    @PluginMethod
    fun delegatedRestoreFailed(call: PluginCall) {
        val errorMessage = call.getString("errorMessage")
            ?: return call.noNecessaryDataError("errorMessage")

        noCodesSandwich.delegatedRestoreFailed(errorMessage)
        call.resolve()
    }
}
