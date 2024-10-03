import { Qonversion, Environment, EntitlementsCacheLifetime, QonversionConfigBuilder, LaunchMode } from 'qonversion-capacitor';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    const config = new QonversionConfigBuilder(
        'PV77YHL7qnGvsdmpTs7gimsxUvY-Znl2',
        LaunchMode.SUBSCRIPTION_MANAGEMENT
    )
        .setEnvironment(Environment.SANDBOX)
        .setEntitlementsCacheLifetime(EntitlementsCacheLifetime.MONTH)
        .build();
    Qonversion.initialize(config);
    // Qonversion.
}
