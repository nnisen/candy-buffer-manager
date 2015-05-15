var productBasket = [];

$(document).ready(function(){ 
  $(".buy-product").on("click", function(){
    var prodId = $(this).parents(".product").attr("data-product-id");
    var prodPrice = $(this).parents(".product").attr("data-product-price");
    productBasket[productBasket.length] = {id : parseInt(prodId), price : parseFloat(prodPrice)};
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
    $("#basket-sum").text(prodSum);
  });
  
  //cart-dropdown
  
  $("#cartsum").on("click", function(){
    
  });
});