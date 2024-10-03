// import {
//     Qonversion,
//     Environment,
//     EntitlementsCacheLifetime,
//     LaunchMode,
//     QonversionConfigBuilder
// } from 'qonversion-capacitor';
import {Qonversion} from "qonversion-capacitor";

window.testEcho = () => {
    console.log("Qonversion capacitor frekjelghjklrtgc cnncnewmf ");
    Qonversion.checkEntitlements().then(res =>
      console.log('RES!', res)
    ).catch(e => console.log('ERR!', e));
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
