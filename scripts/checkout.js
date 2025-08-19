 import {cart, removeFromCart} from '../data/cart.js';
 import {products} from '../data/products.js';
 import { priceToCents } from './utils/money.js';

let cartHTML='';  //variable to hold cart HTML

 cart.forEach((cartItem)=>{

    const productId=cartItem.productId;    ///get product id from cartItem
    let matchingProduct;  //variable to hold matching product


    products.forEach((product)=>{
        if(product.id===productId){
            matchingProduct=product;  //find matching product
        }
 
    });
    console.log(matchingProduct);

    if(matchingProduct){
cartHTML+=  //append HTML for each cart item
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${priceToCents(matchingProduct.priceCents)}
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
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    }
 });


 document.querySelector('.js-order-summary').innerHTML=cartHTML;
 console.log(cartHTML); 



 document.querySelectorAll('.js-event-deleteProduct').
 forEach((remove)=>{
    remove.addEventListener('click',()=>{

      const prodId= remove.dataset.productId;  //get product id from data attribute
      console.log(prodId); 
      removeFromCart(prodId);  
//      console.log(cart);

      const container=document.querySelector(`.js-cart-item-container-${prodId}`);
//        //console.log(container);
       container.remove(); 
   });

 });



/* // Event Delegation for Delete button clicks
document.querySelector('.js-order-summary').addEventListener('click', (event) => {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains('js-event-deleteProduct')) {
        const { productId } = event.target.dataset;

        // Remove the item from the cart data
        removeFromCart(productId);

        // Find and remove the corresponding HTML element
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
            container.remove();
        }

        // Optional: update the total items count in the header
        const cartQuantityElement = document.querySelector('.return-to-home-link');
        cartQuantityElement.textContent = `${cart.length} items`;
    }
});*/

/*import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { priceToCents } from './utils/money.js';

let cartHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Use a more efficient method to find the matching product
    const matchingProduct = products.find(product => product.id === productId);

    if (matchingProduct) {
        cartHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${priceToCents(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary js-event-deleteProduct" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input type="radio" checked
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Tuesday, June 21
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Wednesday, June 15
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Monday, June 13
                                </div>
                                <div class="delivery-option-price">
                                    $9.99 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
});

document.querySelector('.js-order-summary').innerHTML = cartHTML;

// Event Delegation for Delete button clicks
document.querySelector('.js-order-summary').addEventListener('click', (event) => {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains('js-event-deleteProduct')) {
        const { productId } = event.target.dataset;

        // Remove the item from the cart data
        removeFromCart(productId);

        // Find and remove the corresponding HTML element
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
            container.remove();
        }

        // Optional: update the total items count in the header
        const cartQuantityElement = document.querySelector('.return-to-home-link');
        cartQuantityElement.textContent = `${cart.length} items`;
    }
});*/