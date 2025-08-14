export const cart=[];

 export function addToCart(prodId){
    let matchingItem;
               cart.forEach((item)=>{
                if(item.producId===prodId){
                    matchingItem=item;
                }
               });
               if(matchingItem){
                matchingItem.quantity+=1;
               }else{
                cart.push({
                    producId:prodId,
                    quantity:1
                });
               }
               console.log(cart);

}