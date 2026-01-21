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
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "QonversionPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/QonversionPlugin"),
        .testTarget(
            name: "QonversionPluginTests",
            dependencies: ["QonversionPlugin"],
            path: "ios/Tests/QonversionPluginTests")
    ]
)