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
    listlink.addClass("basket-product-info");
        
    listremove.text("X");
    listremove.addClass("basket-product-remover")
    listremove.addClass("btn")
    listremove.addClass("btn-danger")        
    
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

// updates the navbar counters
function updateBasket(){
  var prodSum = 0;
  for(var i = 0; i < productBasket.length; i++){
    prodSum += productBasket[i].price;
  };    
  $("#basket-prods").text(productBasket.length);
  $("#basket-sum").text(prodSum.toFixed(2));

  if(productBasket.length)
    $("#go-to-buy").removeAttr('disabled');    
  else
    $("#go-to-buy").attr('disabled','disabled');
  
  // deals with empty basket ui
  var cls = "empty-basket-list-element";
  var selector = "."+cls;

  if($(selector).length)
    $(selector).remove();
  
  if(!productBasket.length)    
    $("#basket-dropdown .basket-list").append(getEmptyDropdownElement(cls));  
  
  // writes to the cookie-basket
  Cookies.set("basket",productBasket);    
}

function productRemoveButtonFunction(elem){
  
  // counts on products being added to both json and list in the same order
  var listParent = $(elem).parents("."+listItemClass);  
  productBasket.splice($(listParent).index(), 1);
  
  listParent.remove();  
  updateBasket();  
}

function productAddButtonFunction(buttonelem){    

  var product = $(buttonelem).parents(".product");
  var prodId = product.attr("data-product-id");
  var prodPrice = product.attr("data-product-price");
  var prodName = product.attr("data-product-name");
  var prodCategories = product.attr("data-product-categories");
  
  var productInfo = {
    id : parseInt(prodId),
    price : parseFloat(prodPrice),
    name : prodName,
    categories : JSON.parse(prodCategories)
  };
  
  productBasket[productBasket.length] = productInfo;
  
  // loads to list
  var newElem = getProductDropdownElement(productInfo);  
  $("#basket-dropdown .basket-list").append(newElem);  
  $($(newElem).find(".basket-product-remover")).click(function(){
    productRemoveButtonFunction(this);
  });  
  updateBasket();
  
  var interval = 50;
  $("#basket-dropdown").fadeOut(interval*1).fadeIn(interval*2)
    .fadeOut(interval*1).fadeIn(interval*2);
}

$(document).ready(function(){     
  
  // loads from cookies if no prods are in basket
  var cookieBasket = Cookies.get("basket");
  if(!productBasket.length &&  cookieBasket && cookieBasket.length)
  {
    productBasket = JSON.parse(cookieBasket);
    
    for(var i = 0; i < productBasket.length; i++){
    // loads to list as well
      var newElem = getProductDropdownElement(productBasket[i]);  
      $("#basket-dropdown .basket-list").append(newElem);  
      $($(newElem).find(".basket-product-remover")).click(function(){
        productRemoveButtonFunction(this);
      });          
    }
    updateBasket();
  }    
  updateBasket();
  
  $("#go-to-buy").click(function(){
    Cookies.remove("basket");
    Cookies.set("basket",productBasket);
  });
  
  $(".add-product-to-basket").click(function(){    
    productAddButtonFunction(this);    
  });
});