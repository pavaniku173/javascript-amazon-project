import {cart} from '../data/cart.js';
import {getproduct} from '../data/products.js';
import {getdeliveryOption} from '../data/deliveryOptions.js';
import { priceToCents } from './utils/money.js';

export function renderPaymentSummary(){
    console.log("Rendering payment summary...");
    let subtotalCents=0;
    let shippingtotalCents=0;
    cart.forEach((cartItem)=>{
       const product= getproduct(cartItem.productId);
      subtotalCents+= product.priceCents* cartItem.quantity;
        
      const deliveryOption= getdeliveryOption(cartItem.deliveryOptionId);
        shippingtotalCents+= deliveryOption.priceCents;


    });
    console.log(subtotalCents);
    console.log(shippingtotalCents);
    const TotalBeforeTax= subtotalCents+ shippingtotalCents;
    const taxCents= TotalBeforeTax*0.1;
    const totalCents= TotalBeforeTax+ taxCents;

    const paymentSummaryHTML=`
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${priceToCents(subtotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${priceToCents(shippingtotalCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${priceToCents(TotalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${priceToCents(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${priceToCents(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}