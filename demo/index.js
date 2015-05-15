$(document).ready(function(){  
  var prods = 6;
  var box = $("#productbox");  
  $(".product").css("display","normal");
  
  var prod =  $(".product")[0];
  
  for(var i = 0; i < prods; i++){    
    $(prod).clone().appendTo(box);
  }
  
  
})