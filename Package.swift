// swift-tools-version: 5.9
import PackageDescription

// The package and product names must be `QonversionCapacitorPlugin`: the Capacitor CLI derives them from the npm
// package name (`@qonversion/capacitor-plugin`) when it generates the app's CapApp-SPM package.
let package = Package(
    name: "QonversionCapacitorPlugin",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "QonversionCapacitorPlugin",
            targets: ["QonversionPlugin"])
    ],
    dependencies: [
        // Capacitor 7 and 8 apps are supported (see peerDependencies in package.json).
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", "7.0.0"..<"9.0.0"),
        // Same version as `s.dependency "QonversionSandwich"` in the podspec — `fastlane upgrade_sandwich` bumps both.
        .package(url: "https://github.com/qonversion/sandwich-sdk.git", exact: "7.13.1")
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