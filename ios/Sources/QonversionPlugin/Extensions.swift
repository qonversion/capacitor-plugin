import Foundation
import QonversionSandwich
import Capacitor

extension CAPPluginCall {
  func noNecessaryDataError() {
    reject("Could not find necessary arguments. Make sure you pass correct call arguments", "NoNecessaryDataError")
  }

  func sandwichError(_ error: SandwichError) {
    var message = error.details + ". Qonversion Error Code: \(error.code)"

    if let additionalMessage = error.additionalMessage {
      message = "\(message). Additional Message: \(additionalMessage)"
    }

    reject(message, error.code)
  }
}
