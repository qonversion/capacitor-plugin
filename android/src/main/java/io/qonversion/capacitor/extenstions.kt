package io.qonversion.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import io.qonversion.sandwich.BridgeData
import io.qonversion.sandwich.ResultListener
import io.qonversion.sandwich.SandwichError
import org.json.JSONArray
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

internal fun PluginCall.noNecessaryDataError(argument: String) {
    reject("Could not find necessary arguments. Make sure you pass correct value for the argument \"$argument\"", "NoNecessaryDataError")
}

internal fun PluginCall.sandwichError(error: SandwichError) {
    reject(error.description + ". " + error.additionalMessage, error.code)
}

internal fun JSONObject.toMap(): Map<String, Any> {
    val map: MutableMap<String, Any> = HashMap()
    val keys: Iterator<String> = keys()
    while (keys.hasNext()) {
        val key = keys.next()
        var value = get(key)
        if (value is JSONArray) {
            value = value.toList()
        } else if (value is JSObject) {
            value = value.toMap()
        }
        map[key] = value
    }
    return map
}

internal fun JSONArray.toList(): List<Any> {
    val list: MutableList<Any> = ArrayList()
    for (i in 0 until length()) {
        var value = get(i)
        if (value is JSONArray) {
            value = value.toList()
        } else if (value is JSObject) {
            value = value.toMap()
        }
        list.add(value)
    }
    return list
}