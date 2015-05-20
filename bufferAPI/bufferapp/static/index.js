$(document).ready(function(){  
  //var prods = 6;
  var box = $("#productbox");  
  
  var all = $.get("products").success(function(){
    $(all.responseText).appendTo(box);
    
    $(".add-product-to-basket").on("click", function(){
      productAddButtonFunction(this);    
    });
  });
  
  //console.log(all)
  //console.log(all.responseText)
    
  // dummy ui
  //$(".product").css("display","normal");  
  /*
  var prod =  $(".product")[0];  
  for(var i = 0; i < prods; i++){    
    $(prod).clone().appendTo(box);
  }    
  */
  
})