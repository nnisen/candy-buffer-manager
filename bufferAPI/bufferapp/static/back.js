var activeSubpage = 1;
var basket;
var inputCash;
var selectedUser;

function changeSubpage(srcnum, tgtnum){
    
    $("#page-"+srcnum).hide();
    
    if(tgtnum <= 4 && tgtnum > 0){     
      $("#page-"+tgtnum).show();              
      activeSubpage = tgtnum;
    }
    else throw new Error("NO PAGE AAARGHHH");
};

// two functions: checks & returns validity, shows invalidity indicator
function validateMoneyInput(){
  var input = document.getElementById("page-1-money-input");
  var money = $(input).val();
  
  if(!money.length || isNaN(money)){
    input.setCustomValidity("Anna summa."); 
    return false;
  }
  else if(parseFloat(money) < 0){
    input.setCustomValidity("Summan pitää olla positiivinen."); 
    return false;
  }  
  input.setCustomValidity("");
  return true;
}

function listProducts(parentElem, sumTargetElem){
   
  var priceSum = 0.0;  
  for(var i = 0; i < basket.length; i++){
    var li = $("<li/>")
    li.text(basket[i].name+" "+basket[i].price +" €");
    priceSum = priceSum + basket[i].price;
    parentElem.append(li);
  }
  console.log(priceSum);
  sumTargetElem.text(priceSum);
}

$(document).ready(function(){
  
  basket = JSON.parse(Cookies.get("basket"));
  
  listProducts($("#page-1-product-list"), $("#page-1-product-sum"));
  
  
/*  // list the products
  var productlistElem = ;
  var priceSum = 0.0;  
  for(var i = 0; i < basket.length; i++){
    var li = $("<li/>")
    li.text(basket[i].name+" "+basket[i].price +" €");
    priceSum = priceSum + basket[i].price;
    productlistElem.append(li);
  }
  $("#page-1-product-sum").text(priceSum);
  */
  $(".customer-row span").on("click", function(){  
    var customerName = $(this).text();    
    //var customerId = $(this).parent().attr("data-customer-id");
    $("#customer-selection-list > * > *").removeClass("selected-customer");
    $(this).addClass("selected-customer");    
    $("#selected-customer").text(customerName);    
  });
  
  $("#subpage-back").on("click", function(){
    if(activeSubpage > 1)
      changeSubpage(activeSubpage, activeSubpage-1);
  });
  
  // validates on change
  $("#page-1-money-input").change(function(){
    validateMoneyInput();
  });
  
  // page changer buttons
  $(".subpage-submit").on("click", function(){

    // money submit & validation
    if($(this).attr("id") == "page-1-money-submit"){
      if(!validateMoneyInput())
        return;
      
      inputCash = parseFloat($("#page-1-money-input").val());
    }
    
    // customer selection
    if($(this).attr("sourcepage") === "2"){
      selectedUser = $("#selected-customer").text();
    }
    
    if($(this).attr("targetpage") === "3"){
      listProducts($("#page-3-product-list"), $("#page-3-product-sum"));
      $("#page-3-input-cash").text(inputCash) 
      $("#page-3-selected-user").text(selectedUser)       
    }
            
    var srcpage = $(this).attr("sourcepage");
    var targetpage = $(this).attr("targetpage");        
    changeSubpage(srcpage, targetpage);
  }); 
});