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
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(url: "https://github.com/qonversion/sandwich-sdk.git", exact: "7.10.0")
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