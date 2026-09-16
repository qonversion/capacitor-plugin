// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "QonversionCapacitor",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "QonversionCapacitor",
            targets: ["QonversionPlugin"])
    ],
    dependencies: [
        // Capacitor 7 and 8 apps are supported (see peerDependencies in package.json).
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", "7.0.0"..<"9.0.0"),
        // Same version as `s.dependency "QonversionSandwich"` in the podspec — `fastlane upgrade_sandwich` bumps both.
        .package(url: "https://github.com/qonversion/sandwich-sdk.git", exact: "7.13.0")
    ],
    targets: [
        .target(
            name: "QonversionPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "QonversionSandwich", package: "sandwich-sdk")
            ],
            path: "ios/Sources/QonversionPlugin"),
        .testTarget(
            name: "QonversionPluginTests",
            dependencies: ["QonversionPlugin"],
            path: "ios/Tests/QonversionPluginTests")
    ]
)