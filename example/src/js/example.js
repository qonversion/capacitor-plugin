// import {
//     Qonversion,
//     Environment,
//     EntitlementsCacheLifetime,
//     LaunchMode,
//     QonversionConfigBuilder
// } from 'qonversion-capacitor';
import {Environment, LaunchMode, Qonversion, QonversionConfigBuilder} from "qonversion-capacitor";

window.testEcho = () => {
    const c = new QonversionConfigBuilder(
      "PV77YHL7qnGvsdmpTs7gimsxUvY-Znl2",
      LaunchMode.SUBSCRIPTION_MANAGEMENT
    )
      .setEnvironment(Environment.SANDBOX)
      .build();
    Qonversion.initialize(c);
    console.log('test test');
    Qonversion.getSharedInstance().checkEntitlements().then(res => console.log('test azaza', res)).catch(err => console.error('test azazaza', err));
    // Qonversion.checkEntitlements().then(res =>
    //   console.log('RES!', res)
    // ).catch(e => console.log('ERR!', e));
    //
    // const config = new QonversionConfigBuilder(
    //     'PV77YHL7qnGvsdmpTs7gimsxUvY-Znl2',
    //     LaunchMode.SUBSCRIPTION_MANAGEMENT
    // )
    //     .setEnvironment(Environment.SANDBOX)
    //     .setEntitlementsCacheLifetime(EntitlementsCacheLifetime.MONTH)
    //     .build();
    // Qonversion.initialize(config);
    // console.log("Qonversion capacitor initintitntirtnrtintitnietrni 2");
    //
    // Qonversion.getSharedInstance().checkEntitlements();
    //
    // console.log("Qonversion capacitor initintitntirtnrtintitnietrni 3");

    // Qonversion.
}
