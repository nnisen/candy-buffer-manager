var productBasket = [];

function getProductDropdownElement(productInfo){
    var listelem = $("<li/>");        
    var listlink = $("<a/>");
    listlink.attr("href","#");         
    listlink.text("Poista "+productInfo.name+", "+productInfo.price + " e");    
    $(listelem).append(listlink);    
    return listelem;
}

function productAddButtonFunction(buttonelem){    

  var product = $(buttonelem).parents(".product");
  var prodId = product.attr("data-product-id");
  var prodPrice = product.attr("data-product-price");
  var prodName = product.attr("data-product-name");
   
  var productInfo = {
    id : parseInt(prodId),
    price : parseFloat(prodPrice),
    name : prodName
  };
    
  /*
  console.log(prodId);
  console.log(prodPrice);
  console.log(productInfo);
  */
  productBasket[productBasket.length] = productInfo;
    
  /*
  console.log(this)
  console.log(prodId)    */
  console.log(productBasket);
  
    
  var prodSum = 0;
  for(var i = 0; i < productBasket.length; i++){
    prodSum += productBasket[i].price;
  };    
  $("#basket-prods").text(productBasket.length);
  $("#basket-sum").text(prodSum.toFixed(2));    
  $("#basket-dropdown .basket-list").append(getProductDropdownElement(productInfo));
}

$(document).ready(function(){   
  $(".add-product-to-basket").on("click", function(){
    productAddButtonFunction(this);    
  });
});