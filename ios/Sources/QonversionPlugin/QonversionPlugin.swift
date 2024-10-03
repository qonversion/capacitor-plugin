import Foundation
import Capacitor
import QonversionSandwich

@objc(QonversionPlugin)
public class QonversionPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "QonversionPlugin"
  public let jsName = "Qonversion"
  public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "identify", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "products", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "promoPurchase", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "checkEntitlements", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "remoteConfig", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "remoteConfigList", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "userInfo", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "userProperties", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "offerings", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "setDefinedUserProperty", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "setCustomUserProperty", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "checkTrialIntroEligibility", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "attachUserToExperiment", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "detachUserFromExperiment", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "attachUserToRemoteConfiguration", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "detachUserFromRemoteConfiguration", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "storeSdkInfo", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "addAttributionData", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "collectAppleSearchAdsAttribution", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "isFallbackFileAccessible", returnType: CAPPluginReturnPromise),
    CAPPluginMethod(name: "presentCodeRedemptionSheet", returnType: CAPPluginReturnPromise)
  ]
  
  var qonversionSandwich: QonversionSandwich?
  
  override public func load() {
    qonversionSandwich = QonversionSandwich.init(qonversionEventListener: self)
  }
  
  @objc func initialize(_ call: CAPPluginCall) {
    guard let projectKey = call.getString("projectKey"),
          let launchMode = call.getString("launchMode") else {
      return call.noNecessaryDataError()
    }
    let environment = call.getString("environment")
    let entitlementsCacheLifetime = call.getString("entitlementsCacheLifetime")
    let proxyUrl = call.getString("proxyUrl")
    
    qonversionSandwich?.initialize(
      projectKey: projectKey,
      launchModeKey: launchMode,
      environmentKey: environment,
      entitlementsCacheLifetimeKey: entitlementsCacheLifetime,
      proxyUrl: proxyUrl
    )
    
    call.resolve()
  }
  
  @objc func identify(_ call: CAPPluginCall) {
    guard let userId = call.getString("userId") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.identify(userId, getDefaultCompletion(call))
  }
  
  @objc func products(_ call: CAPPluginCall) {
    qonversionSandwich?.products(getDefaultCompletion(call))
  }
  
  @objc func purchase(_ call: CAPPluginCall) {
    guard let productId = call.getString("productId") else {
      return call.noNecessaryDataError()
    }
    let quantity = call.getInt("quantity") ?? 1
      let contextKeys = call.getArray("contextKeys")?.capacitor.replacingNullValues().compactMap({$0}) as? [String] ?? []
    
    qonversionSandwich?.purchase(productId, quantity:quantity, contextKeys:contextKeys, completion: getDefaultCompletion(call))
  }
  
  @objc func promoPurchase(_ productId: String?, _ call: CAPPluginCall) {
    guard let productId = call.getString("productId") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.promoPurchase(productId, completion: getDefaultCompletion(call))
  }
  
  @objc func checkEntitlements(_ call: CAPPluginCall) {
    qonversionSandwich?.checkEntitlements(getDefaultCompletion(call))
  }
  
  @objc func remoteConfig(_ contextKey: String?, _ call: CAPPluginCall) {
    qonversionSandwich?.remoteConfig(contextKey, getDefaultCompletion(call))
  }
  
  @objc func remoteConfigList(_ call: CAPPluginCall) {
      guard let contextKeys = call.getArray("contextKeys")?.capacitor.replacingNullValues().compactMap({$0}) as? [String] else {
      qonversionSandwich?.remoteConfigList(getDefaultCompletion(call))
        return
    }
    
    guard let includeEmptyContextKey = call.getBool("includeEmptyContextKey") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.remoteConfigList(contextKeys, includeEmptyContextKey:includeEmptyContextKey, getDefaultCompletion(call))
  }
  
  @objc func userInfo(_ call: CAPPluginCall) {
    qonversionSandwich?.userInfo(getDefaultCompletion(call))
  }
  
  @objc func userProperties(_ call: CAPPluginCall) {
    qonversionSandwich?.userProperties(getDefaultCompletion(call))
  }
  
  @objc func restore(_ call: CAPPluginCall) {
    qonversionSandwich?.restore(getDefaultCompletion(call))
  }
  
  @objc func offerings(_ call: CAPPluginCall) {
    qonversionSandwich?.offerings(getDefaultCompletion(call))
  }
  
  @objc func setDefinedUserProperty(_ call: CAPPluginCall) {
    guard let rawProperty = call.getString("property"),
          let value = call.getString("value") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.setDefinedProperty(rawProperty, value: value)
    call.resolve()
  }
  
  @objc func setCustomUserProperty(_ call: CAPPluginCall) {
    guard let property = call.getString("property"),
          let value = call.getString("value") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.setCustomProperty(property, value: value)
    call.resolve()
  }
  
  @objc func checkTrialIntroEligibility(_ call: CAPPluginCall) {
      guard let ids = call.getArray("ids")?.capacitor.replacingNullValues().compactMap({$0}) as? [String] else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.checkTrialIntroEligibility(ids, completion: getDefaultCompletion(call))
  }
  
  @objc func attachUserToExperiment(_ call: CAPPluginCall) {
    guard let experimentId = call.getString("experimentId"),
          let groupId = call.getString("groupId") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.attachUserToExperiment(with: experimentId, groupId: groupId, completion: getDefaultCompletion(call))
  }
  
  @objc func detachUserFromExperiment(_ call: CAPPluginCall) {
    guard let experimentId = call.getString("experimentId") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.detachUserFromExperiment(with: experimentId, completion: getDefaultCompletion(call))
  }
  
  @objc func attachUserToRemoteConfiguration(_ call: CAPPluginCall) {
    guard let remoteConfigurationId = call.getString("remoteConfigurationId") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.attachUserToRemoteConfiguration(with: remoteConfigurationId, completion: getDefaultCompletion(call))
  }
  
  @objc func detachUserFromRemoteConfiguration(_ call: CAPPluginCall) {
    guard let remoteConfigurationId = call.getString("remoteConfigurationId") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.detachUserFromRemoteConfiguration(with: remoteConfigurationId, completion: getDefaultCompletion(call))
  }
  
  @objc func storeSdkInfo(_ call: CAPPluginCall) {
    guard let version = call.getString("version"),
          let source = call.getString("source") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.storeSdkInfo(source: source, version: version)
    call.resolve()
  }
  
  @objc func addAttributionData(_ call: CAPPluginCall) {
      guard let data = call.getObject("data"),
          let provider = call.getString("provider") else {
      return call.noNecessaryDataError()
    }
    
    qonversionSandwich?.attribution(providerKey: provider, value: data)
    call.resolve()
  }
  
  @objc func collectAppleSearchAdsAttribution(_ call: CAPPluginCall) {
    qonversionSandwich?.collectAppleSearchAdsAttribution()
    call.resolve()
  }
  
  @objc func isFallbackFileAccessible(_ call: CAPPluginCall) {
    qonversionSandwich?.isFallbackFileAccessible(completion: getDefaultCompletion(call))
  }
  
  @objc func presentCodeRedemptionSheet(_ call: CAPPluginCall) {
    if #available(iOS 14.0, *) {
      qonversionSandwich?.presentCodeRedemptionSheet()
    }
    call.resolve()
  }
  
  private func getDefaultCompletion(_ call: CAPPluginCall) -> BridgeCompletion {
    return { data, error in
      if let error = error {
        return call.sandwichError(error)
      }
      
        guard let data else { return call.resolve() }
        
        call.resolve(data)
    }
  }
}

extension QonversionPlugin: QonversionEventListener {
  public func qonversionDidReceiveUpdatedEntitlements(_ entitlements: [String : Any]) {
    self.notifyListeners("entitlementsUpdatedEvent", data: entitlements)
  }
  
  public func shouldPurchasePromoProduct(with productId: String) {
    self.notifyListeners("shouldPurchasePromoProductEvent", data: ["productId": productId])
  }
}
