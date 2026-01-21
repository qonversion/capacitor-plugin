import Foundation
import Capacitor
import QonversionSandwich

private let NoCodesEventName = "noCodesEvent"
private let NoCodesPurchaseEventName = "noCodesPurchase"
private let NoCodesRestoreEventName = "noCodesRestore"

@objc(NoCodesPlugin)
public class NoCodesPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NoCodesPlugin"
    public let jsName = "NoCodes"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setScreenPresentationConfig", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showScreen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "close", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setPurchaseDelegate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setLocale", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "delegatedPurchaseCompleted", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "delegatedPurchaseFailed", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "delegatedRestoreCompleted", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "delegatedRestoreFailed", returnType: CAPPluginReturnPromise)
    ]

    var noCodesSandwich: NoCodesSandwich?
    var purchaseDelegateBridge: NoCodesPurchaseDelegateBridgeImpl?

    override public func load() {
        noCodesSandwich = NoCodesSandwich(noCodesEventListener: self)
    }

    @objc func initialize(_ call: CAPPluginCall) {
        guard let projectKey = call.getString("projectKey") else {
            return call.noNecessaryDataError()
        }

        let proxyUrl = call.getString("proxyUrl")
        let locale = call.getString("locale")

        noCodesSandwich?.initialize(projectKey: projectKey, proxyUrl: proxyUrl, locale: locale)

        if let source = call.getString("source"),
           let version = call.getString("version") {
            noCodesSandwich?.storeSdkInfo(source: source, version: version)
        }

        call.resolve()
    }

    @objc func setScreenPresentationConfig(_ call: CAPPluginCall) {
        guard let configData = call.getObject("configData") else {
            return call.noNecessaryDataError()
        }

        let contextKey = call.getString("contextKey")
        DispatchQueue.main.async { [weak self] in
            self?.noCodesSandwich?.setScreenPresentationConfig(configData, forContextKey: contextKey)
        }
        call.resolve()
    }

    @objc func showScreen(_ call: CAPPluginCall) {
        guard let contextKey = call.getString("contextKey") else {
            return call.noNecessaryDataError()
        }

        DispatchQueue.main.async { [weak self] in
            self?.noCodesSandwich?.showScreen(contextKey)
        }
        call.resolve()
    }

    @objc func close(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            self?.noCodesSandwich?.close()
        }
        call.resolve()
    }

    @objc func setLocale(_ call: CAPPluginCall) {
        let locale = call.getString("locale")
        noCodesSandwich?.setLocale(locale)
        call.resolve()
    }

    @objc func setPurchaseDelegate(_ call: CAPPluginCall) {
        purchaseDelegateBridge = NoCodesPurchaseDelegateBridgeImpl { [weak self] productData in
            self?.notifyListeners(NoCodesPurchaseEventName, data: productData)
        } onRestore: { [weak self] in
            self?.notifyListeners(NoCodesRestoreEventName, data: [:])
        }

        if let bridge = purchaseDelegateBridge {
            noCodesSandwich?.setPurchaseDelegate(bridge)
        }

        call.resolve()
    }

    @objc func delegatedPurchaseCompleted(_ call: CAPPluginCall) {
        noCodesSandwich?.delegatedPurchaseCompleted()
        call.resolve()
    }

    @objc func delegatedPurchaseFailed(_ call: CAPPluginCall) {
        guard let errorMessage = call.getString("errorMessage") else {
            return call.noNecessaryDataError()
        }

        noCodesSandwich?.delegatedPurchaseFailed(errorMessage)
        call.resolve()
    }

    @objc func delegatedRestoreCompleted(_ call: CAPPluginCall) {
        noCodesSandwich?.delegatedRestoreCompleted()
        call.resolve()
    }

    @objc func delegatedRestoreFailed(_ call: CAPPluginCall) {
        guard let errorMessage = call.getString("errorMessage") else {
            return call.noNecessaryDataError()
        }

        noCodesSandwich?.delegatedRestoreFailed(errorMessage)
        call.resolve()
    }
}

extension NoCodesPlugin: NoCodesEventListener {
    public func noCodesDidTrigger(event: String, payload: [String: Any]?) {
        let eventData: [String: Any] = [
            "name": event,
            "payload": payload ?? [:]
        ]
        self.notifyListeners(NoCodesEventName, data: eventData)
    }
}

class NoCodesPurchaseDelegateBridgeImpl: NoCodesPurchaseDelegateBridge {
    private let onPurchase: ([String: Any]) -> Void
    private let onRestore: () -> Void

    init(onPurchase: @escaping ([String: Any]) -> Void, onRestore: @escaping () -> Void) {
        self.onPurchase = onPurchase
        self.onRestore = onRestore
    }

    func purchase(_ product: [String: Any]) {
        onPurchase(product)
    }

    func restore() {
        onRestore()
    }
}
