$(document).ready(function(){
  var box = $("#productbox");  
  
  var all = $.get("products").success(function(){
    $(all.responseText).appendTo(box); 
    console.log(all.responseText);    
  
    /*
    var count = $(".product").length;
    $("#maincontainer").css("height",(count/3.0*450.0)+"px");
    */
  
    $(".add-product-to-basket").on("click", function(){
      productAddButtonFunction(this);    
    });
  });
});