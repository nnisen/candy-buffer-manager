var productBasket = [];

function getProductDropdownElement(productInfo){
    var listelem = $("<li/>");
    var listlink = $("<a/>");
    var listremove = $("<span/>");
    
    listelem.attr("data-product-id",productInfo.id);
    
    listlink.attr("href","#");
    listlink.text(""+productInfo.name+", "+productInfo.price + " e");
    listlink.addClass("basket-product-info")
    
    
    listremove.text("X");
    listremove.addClass("basket-product-remover")
    listremove.addClass("btn")
    listremove.addClass("btn-danger")    
    listremove.click(function(){console.log("clicked!")})
    
    $(listlink).append(listremove);
    $(listelem).append(listlink);
    return listelem;
}

function getEmptyDropdownElement(id){
    var listelem = $("<li/>");
    var listlink = $("<a/>");
    listlink.attr("id","empty-basket-list-element");
    listlink.attr("href","#");
    listlink.text("Ostoskori on tyhjä");
    $(listelem).append(listlink);
    return listelem;
}

function dealWithBasketEmptiness(){
  var id = "empty-basket-list-element";
  var idSelector = "#"+id;

  if(!productBasket.length)
    $("#basket-dropdown .basket-list").append(getEmptyDropdownElement(id));    
  else if($(idSelector).length)
    $(idSelector).remove();
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
  dealWithBasketEmptiness();
}

$(document).ready(function(){     
  dealWithBasketEmptiness();
  
  $(".add-product-to-basket").on("click", function(){    
    productAddButtonFunction(this);    
  });
});