import XCTest
@testable import QonversionPlugin

class QonversionPluginTests: XCTestCase {
    func testPluginIsBridgedUnderItsJSName() {
        let plugin = QonversionPlugin()

        XCTAssertEqual(plugin.identifier, "QonversionPlugin")
        XCTAssertEqual(plugin.jsName, "Qonversion")
        XCTAssertFalse(plugin.pluginMethods.isEmpty)
    }

    func testNoCodesPluginIsBridgedUnderItsJSName() {
        let plugin = NoCodesPlugin()

        XCTAssertEqual(plugin.identifier, "NoCodesPlugin")
        XCTAssertEqual(plugin.jsName, "NoCodes")
        XCTAssertFalse(plugin.pluginMethods.isEmpty)
    }
}
