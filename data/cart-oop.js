
class cart{
    cartItems;
    #LocalStoragekey='cart';

    constructor(){
        this.loadFromStorage();
    }

    loadFromStorage(){
         this.cartItems= JSON.parse(localStorage.getItem(this.#LocalStoragekey));
         if(!this.cartitems){
            this.cartItems=
            [{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:2,
                deliveryOptionId:'1'
            },{
                 productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                 quantity:1,
                 deliveryOptionId:'2'
            }];
        }
    }

    saveToLocalStorage(){
        localStorage.setItem(this.#LocalStoragekey,JSON.stringify(this.cartItems));
      }

    addToCart(productId){
    const matchingItem= this.cartItems.find((item)=>item.productId===productId);
            if(matchingItem){
            matchingItem.quantity+=1;
            }else{
            this.cartItems.push({
                productId:productId,
                quantity:1,
                deliveryOptionId:'1'
            });
            }
    this.saveToLocalStorage();

    }

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((item)=>{
            if(item.productId!==productId){
                newCart.push(item);
            }
        });
     this.cartItems=newCart;
     this.saveToLocalStorage();
    }

     updateDeliveryOption(productId,deliveryOptionId){
        const matchingItem= this.cartItems.find((item)=>item.productId===productId);
        if( matchingItem){
                   matchingItem.deliveryOptionId=deliveryOptionId;
        this.saveToLocalStorage();
        }
    }

}
 export const cartoop=new cart();
