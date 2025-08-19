export let cart= JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart=
    [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2
    },{
         productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
         quantity:1
    }];
}


function saveToLocalStorage(){
   localStorage.setItem('cart',JSON.stringify(cart));
 }
 export function addToCart(prodId){
    let matchingItem;
               cart.forEach((item)=>{
                if(item.productId===prodId){
                    matchingItem=item;
                }
               });
               if(matchingItem){
                matchingItem.quantity+=1;
               }else{
                cart.push({
                    productId:prodId,
                    quantity:1
                });
               }
            saveToLocalStorage();
               //console.log(cart);

}
export function removeFromCart(prodId){
    const newCart=[];
    cart.forEach((item)=>{
        if(item.productId!==prodId){
            newCart.push(item);
        }
    });
 cart=newCart;
 saveToLocalStorage();
 
}