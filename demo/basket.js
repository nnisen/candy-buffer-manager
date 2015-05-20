var productBasket = [];

function getProductDropdownElement(productInfo){
    var listelem = $("<li/>");    
    
    var listlink = $("<a/>");
    listlink.attr("href","#");     

    
    listlink.text("Poista "+productInfo.id+", "+productInfo.price);
    
    $(listelem).append(listlink);    
    return listelem;
}

$(document).ready(function(){ 
  $(".add-product-to-basket").on("click", function(){
    // ADD PRODUCT TO BASKET
    
    var prodId = $(this).parents(".product").attr("data-product-id");
    var prodPrice = $(this).parents(".product").attr("data-product-price");
    var productInfo = {id : parseInt(prodId), price : parseFloat(prodPrice)};
    
    productBasket[productBasket.length] = productInfo;
    
    /*
    console.log(this)
    console.log(prodId)    
    console.log(productBasket);
    */
    
    var prodSum = 0;
    for(var i = 0; i < productBasket.length; i++){
      prodSum += productBasket[i].price;
    };    
    $("#basket-prods").text(productBasket.length);
    $("#basket-sum").text(prodSum.toFixed(2));
    
    $("#basket-dropdown .basket-list").append(getProductDropdownElement(productInfo));
  });
  
  /*<li><a tabindex="-1" href="#"></a></li>*/
  
  
  
});