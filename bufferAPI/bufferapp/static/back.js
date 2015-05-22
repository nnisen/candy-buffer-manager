var activeSubpage = 1;
var basket;
var inputCash;
var activeCustomer;
//var customers = [];

function changeSubpage(srcnum, tgtnum){
    
    $("#page-"+srcnum).hide();
    
    if(tgtnum <= 4 && tgtnum > 0){     
      $("#page-"+tgtnum).show();              
      activeSubpage = tgtnum;
    }
    else throw new Error("NO PAGE AAARGHHH");
    
    if(activeSubpage === 1){
      $("#subpage-tofront").css("display","block");
      $("#subpage-back").css("display","none");
    }else{
      $("#subpage-tofront").css("display","none");
      $("#subpage-back").css("display","block");
    }
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

function listCustomers(parentElem){   
  var customers = []; // this could also be global
  var onHoldElem = $("<span/>");
  onHoldElem.text("Ladataan ...");   
  parentElem.append(onHoldElem);
   
  var response = $.get("/customers").success(function(){     
    console.log(response.responseText);     
    var json = JSON.parse(response.responseText);
    
    for(var i = 0; i < json.length; i++){
      customers.push({
        "id":json[i].pk,
        "name":json[i].fields.username,
        "balance":json[i].fields.balance       
      });
       
      // do the HTML stuff while we are looping...
     
      var listElem = $("<li/>");
      listElem.addClass("customer-row");
      listElem.attr("data-customer-id",customers[i].id);
      
      var listNameSpan = $("<span/>");
      listNameSpan.addClass("customer-name");
      listNameSpan.text(customers[i].name);
      
      var listBalanceSpan = $("<span/>");
      listBalanceSpan.addClass("customer-balance");
      listBalanceSpan.text("   "+customers[i].balance);
      
      listElem.append(listNameSpan);
      listElem.append(listBalanceSpan);
      parentElem.append(listElem);
    };     
    console.log("CUSTOMERS");
    console.log(customers);
    onHoldElem.remove();
     
    // customer list magic
    $(".customer-row").on("click", function(){  
      console.log("ROW CLICK");
      console.log(this);
      var customerName = $(this).find(".customer-name").text().trim();
      var customerBalance = $(this).find(".customer-balance").text().trim();
      var customerId = $(this).attr("data-customer-id");
      $("#page-2-customer-list > li").removeClass("selected-customer");
      $(this).addClass("selected-customer");
      
      activeCustomer = {
        "id":parseInt(customerId),
        "name":customerName,
        "balance":parseFloat(customerBalance)
      };
      
      $("#selected-customer").text(activeCustomer.name);
    });
   }).fail(function(){console.log("FAIL")});
   
   console.log("listCustomers");
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

    var sourcepage = parseInt($(this).attr("sourcepage"));
    var targetpage = parseInt($(this).attr("targetpage"));
    
    // money submit & validation
    if($(this).attr("id") == "page-1-money-submit"){
      if(!validateMoneyInput())
        return;
      
      inputCash = parseFloat($("#page-1-money-input").val());
    }
    
    // save customer selection
    if(sourcepage === 2){
      if(!activeCustomer)
        return;
        //selectedUser = $("#selected-customer").text();
    }
    
    if(targetpage === 2){
      listCustomers($("#page-2-customer-list"));
    }
    
    // populate data displays
    if(targetpage === 3){
      listProducts($("#page-3-product-list"), $("#page-3-product-sum"));
      $("#page-3-input-cash").text(inputCash);
      $("#page-3-customer-name").text(activeCustomer.name);
      $("#page-3-customer-balance").text(activeCustomer.balance);      
      var priceSum = parseFloat($("#page-3-product-sum").text());
      
      console.log("DA MONIES");
      console.log(activeCustomer.balance);
      console.log(inputCash);
      console.log(priceSum);
      
      var finalBalance = activeCustomer.balance + inputCash - priceSum;
      
      $("#page-3-final-balance").text(finalBalance);      
    }
    
    if(sourcepage === 3 && targetpage === 4){
      var parent = $(this).find(".summary-parent");
      var prefix = "page-3-";
      
      //the "schema":
      /*{
      "customerId":1,
      "sum":1.5, // sum of prod prices
      "money":0, // input cash 
      "products":[11,12] // prod id array
      }
      */
      var sum = 0;
      var prodIdArr = [];     
      for(var i = 0; i < basket.length; i++){
        prodIdArr.push(basket[i].id);
        sum = sum + basket[i].price;
      }
      
      var buyingMessageObject = {
        "customerId" : ""+activeCustomer.id,
        "sum": ""+sum,
        "money": ""+inputCash,
        ///"products":JSON.stringify(prodIdArr)
      };
      
      $.post("/transactions", buyingMessageObject)
        .success(function(){
        $("#page-4-success-confirmation").text("Osto onnistui. Kiitos!");
      }).fail(function(){
        $("#page-4-success-confirmation").text("Tapahtui virhe.");
      });
      
      /*
      id="product-sum"
      id="input-cash"
      id="customer-name"
      id="customer-balance"
      id="final-balance"
      */
    }
    
    changeSubpage(sourcepage, targetpage);
  });
});