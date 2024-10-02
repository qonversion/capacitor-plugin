package io.qonversion.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import io.qonversion.sandwich.BridgeData
import io.qonversion.sandwich.ResultListener
import io.qonversion.sandwich.SandwichError
import org.json.JSONObject

internal fun BridgeData.toJSObject(): JSObject {
    val json = JSONObject(this)
    return JSObject.fromJSONObject(json)
}

internal fun PluginCall.toResultListener(): ResultListener {
    return object : ResultListener {
        override fun onError(error: SandwichError) {
            sandwichError(error)
        }

        override fun onSuccess(data: BridgeData) {
            resolve(data.toJSObject())
        }
    }
}

fun PluginCall.noNecessaryDataError() {
    reject("Could not find necessary arguments. Make sure you pass correct call arguments", "NoNecessaryDataError")
}

fun PluginCall.sandwichError(error: SandwichError) {
    reject(error.description + ". " + error.additionalMessage, error.code)
}
