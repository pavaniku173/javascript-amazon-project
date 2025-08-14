export const cart=[];

 export function addToCart(prodName){
    let matchingItem;
               cart.forEach((item)=>{
                if(item.producName===prodName){
                    matchingItem=item;
                }
               });
               if(matchingItem){
                matchingItem.quantity+=1;
               }else{
                cart.push({
                    producName:prodName,
                    quantity:1
                });
               }
               console.log(cart);

}