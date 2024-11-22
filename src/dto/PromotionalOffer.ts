import {SKProductDiscount} from './storeProducts/SKProductDiscount';
import {SKPaymentDiscount} from './storeProducts/SKPaymentDiscount';

export class PromotionalOffer {
    public readonly productDiscount: SKProductDiscount;
    public readonly paymentDiscount: SKPaymentDiscount;

    constructor (
        productDiscount: SKProductDiscount,
        paymentDiscount: SKPaymentDiscount
    ) {
        this.productDiscount = productDiscount;
        this.paymentDiscount = paymentDiscount;
    }
}
