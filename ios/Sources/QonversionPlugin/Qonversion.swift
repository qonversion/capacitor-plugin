import Foundation

@objc public class Qonversion: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
