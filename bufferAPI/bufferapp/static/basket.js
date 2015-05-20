var productBasket = [];
var listItemClass = "product-dropdown-list-item";

function getProductDropdownElement(productInfo){
    var listelem = $("<li/>");
    var listlink = $("<a/>");
    var listremove = $("<span/>");
    
    listelem.addClass(listItemClass);
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

function getEmptyDropdownElement(cls){
    var listelem = $("<li/>");
    var listlink = $("<a/>");
    listelem.addClass(cls);
    listlink.attr("href","#");
    listlink.text("Ostoskori on tyhjä");
    $(listelem).append(listlink);
    return listelem;
}

function updateBasket(){
  var prodSum = 0;
  for(var i = 0; i < productBasket.length; i++){
    prodSum += productBasket[i].price;
  };    
  $("#basket-prods").text(productBasket.length);
  $("#basket-sum").text(prodSum.toFixed(2));    

  // deal with empty basket  
  var cls = "empty-basket-list-element";
  var selector = "."+cls;

  if($(selector).length)
    $(selector).remove();
  
  if(!productBasket.length)    
    $("#basket-dropdown .basket-list").append(getEmptyDropdownElement(cls));  
}

function productRemoveButtonFunction(elem){
  //console.log("REMOVING")

  var listParent = $(elem).parents("."+listItemClass);  
  productBasket.splice($(listParent).index(), 1);
  listParent.remove();
  
  /*
  var keepGoing = true;  
  for(var i = 0; i < productBasket.length; i++){
    if(productBasket[i].id === targetId){
      console.log("BEFORE-AFTER");
      console.log()
      console.log(productBasket.length);
      productBasket.splice(i, 1);
      console.log(productBasket.length);
      listParent.remove();
      //console.log("DID IT");      
      keepGoing = false;   
    }
  } 
  */  
  updateBasket();
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

  productBasket[productBasket.length] = productInfo;

  console.log(productBasket);  
  
  var newElem = getProductDropdownElement(productInfo);
  
  $("#basket-dropdown .basket-list").append(newElem);
  
  $($(newElem).find(".basket-product-remover")).click(function(){
    productRemoveButtonFunction(this);
  });
  
  updateBasket();  
}

$(document).ready(function(){     
  updateBasket();
  
  $(".add-product-to-basket").on("click", function(){    
    productAddButtonFunction(this);    
  });
});