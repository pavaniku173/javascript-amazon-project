 import {cart, removeFromCart,updateDeliveryOption} from '../data/cart.js';
 import {loadProducts,loadProductsFetch} from '../data/products.js';
 import { priceToCents } from './utils/money.js';
 import { deliveryOptions } from '../data/deliveryOptions.js';
 import { renderPaymentSummary } from './paymentSummary.js';  
 import {getproduct} from '../data/products.js';
 import { getdeliveryOption } from '../data/deliveryOptions.js';
 import '../data/cart-oop.js';  //importing oop cart to use its functionality
import { businessCart, cartoop } from '../data/cart-oop.js';
import '../data/backend-practice.js';
import {loadCart} from  '../data/cart-oop.js';


async function loadPage(){
  //console.log('Page loaded');
try{
  //throw 'error';
  await loadProductsFetch();  //wait for products to load

  const value= await new Promise((resolve,reject)=>{
    //throw does not work inside promise
    loadCart(()=>{
      //reject('error in loading cart');
       resolve('valye from load cart');
    });

  });
  console.log(value);  

}catch(error){
  console.log('Error loading products:',error);
}
  
  renderCheckoutSummary();
  renderPaymentSummary();

  //return 'Page load complete';
}
loadPage();
/*.then((value)=>{
  console.log(value);
  console.log('Next step after page load');
})*/

/*new Promise((resolve)=>{
  //console.log('start promise');
  loadProducts(()=>{
    //console.log('finished loading products');
    resolve();
    //console.log('promise resolved');
  });
}).then(()=>{
  renderCheckoutSummary();
   renderPaymentSummary();
    //console.log('next step after loading products');
  });*/

/*Promise.all([
  // new Promise((resolve)=>{
  //   loadProducts(()=>{
  //     resolve('resolve1');
  //   });

  // })
  loadProductsFetch()
  ,new Promise((resolve)=>{
    loadCart(()=>{
      resolve(10);    
    });
  })
]).then((values)=>{
  console.log(values);  //values is an array of resolved values from all promises
  renderCheckoutSummary();
  renderPaymentSummary();
});*/




  /*new Promise((resolve)=>{
    loadProducts(()=>{
      resolve();
    });

  }).then(()=>{
    return new Promise((resolve)=>{
      loadCart(()=>{
        resolve();    
      });
    });
  }).then(()=>{
    renderCheckoutSummary();
    renderPaymentSummary();
  });*/


  
//BOTH callbacks and promises works the same way 1st loadprodcuts then goes to checkout and payment page
//callbacks are nested inside each other whereas promises are chained using then() method


 /*loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutSummary();
    renderPaymentSummary();
  });
  //renderCheckoutSummary();

 //renderPaymentSummary();
});*/

function renderCheckoutSummary(){


let cartHTML='';  //variable to hold cart HTML

 cart.forEach((cartItem)=>{                   

    const productId=cartItem.productId;    ///get product id from cartItem
    
    // let matchingProduct;  //variable to hold matching product
    //  products.forEach((product)=>{
    //     if(product.id===productId){
    //         matchingProduct=product;  //find matching product
    //     }
 
    // });
    // console.log(matchingProduct);

    //const matchingProduct= products.find((product)=>product.id===productId); //find method to find matching product
    const matchingProduct=getproduct(productId);
    const OptionId=cartItem.deliveryOptionId; //get delivery option id from cart item

    // let deliveryOption;  //variable to hold matching delivery option
    // deliveryOptions.forEach((option)=>{
    //     if(option.id===deliveryOptionsId){
    //         deliveryOption=option;  //find matching delivery option
    //     }
    // });
    // console.log(deliveryOption);

    //const deliveryOption= deliveryOptions.find((option)=>option.id===deliveryOptionId)|| deliveryOptions[0]; //find method to find matching delivery option
    const deliveryOption= getdeliveryOption(OptionId);
    const today= dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');





    if(matchingProduct){
cartHTML+=  //append HTML for each cart item
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary 
          js-event-deleteProduct" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>`;
    }
 });

 document.querySelector('.js-order-summary').innerHTML = cartHTML;
    addEventListeners();
}



 function deliveryOptionsHTML(matchingProduct,cartItem){     //cartItem is passed as argument bcoz it is outside the scope of this function       
  let html='';

  deliveryOptions.forEach((option)=>{

    const today= dayjs();
    const deliveryDate= today.add(option.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');

    const priceString=option.priceCents===0?'Free':`$${priceToCents(option.priceCents)} - ` ;

    const isChecked= option.id===cartItem.deliveryOptionId;              //access to deliveryoptid


 html+=
    `<div class="delivery-option" "js-event-delivery-option" 
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${option.id}">
    <input type="radio" ${isChecked?'checked':''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">                       
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>

  `});
  return html;
}


//  document.querySelector('.js-order-summary').innerHTML=cartHTML;
//  console.log(cartHTML); 


function addEventListeners(){
 document.querySelectorAll('.js-event-deleteProduct').
forEach((remove)=>{
  remove.addEventListener('click',()=>{
  const prodId= remove.dataset.productId;  //get product id from data attribute
    console.log(prodId); 
    removeFromCart(prodId);  
    renderCheckoutSummary();
    renderPaymentSummary();     //regenerate payment summary on product removal using mvc
//      console.log(cart);

//       const container=document.querySelector(`.js-cart-item-container-${prodId}`);
// //        //console.log(container);
//        container.remove(); 
   });

 });

document.querySelectorAll('.js-event-delivery-option').
forEach((optionElem)=>{
  optionElem.addEventListener('click',()=>{
    //const { productId,deliveryOptionId}=optionElem.dataset;
    // Add toString() to ensure the data type is a string
const { productId } = optionElem.dataset;
const deliveryOptionId = optionElem.dataset.deliveryOptionId;
    updateDeliveryOption(productId,deliveryOptionId);
    renderCheckoutSummary();
    renderPaymentSummary();            //re-render payment summary on delivery option change
  });
});
}
// renderCheckoutSummary();

// renderPaymentSummary();

//cartoop.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
 
/* Based on the code and comments you've provided, you've identified the exact cause of your previous issue: the line cartoop.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');.

The Problem
The line cartoop.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); was a hardcoded instruction to add a product to the cart every time the page loaded.

When you refreshed the page, the JavaScript code was executed again from the top.

Your cartoop object was created, and its constructor correctly loaded the saved cart from local storage.

Immediately after, the line cartoop.addToCart(...) was executed, which automatically added one more item to the cart and saved it to local storage.

This is why the quantity of your socks product was increasing with every refresh and why the cart appeared to be "resetting" and then getting one extra item. It was not a bug in your cart-oop class itself, but a logical error in how you were using it.

*/
console.log(cartoop);
console.log(businessCart);
//console.log(cartoop.cartItems);
