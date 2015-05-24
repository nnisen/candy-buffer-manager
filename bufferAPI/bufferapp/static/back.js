var activeSubpage = 1;
var basket;
var inputCash;
var activeCustomer;
var spareMeClass = "spare-me-please" // to skip when deleting

// "validation" check: colors elem text red on a subzero value
function redCheck(value, elem){  
  console.log("redCheck")
  console.log(value)
  console.log(elem)
  
  var origAttrName = "data-original-color";
  var badColor = "red";
  
  if(elem.css("color") !== badColor)
    elem[origAttrName] = elem.css("color");
            
  if(parseFloat(value) < 0){ 
    elem.css("color",badColor);
  }else{
    elem.css("color",elem[origAttrName]);
  }
}

function changeSubpage(srcnum, tgtnum){
    
    $("#page-"+srcnum).hide();
    
    // subpages are numbered 1 to 4
    if(tgtnum <= 4 && tgtnum > 0){     
      $("#page-"+tgtnum).show();
      activeSubpage = tgtnum;
    }
    else throw new Error("NO SUCH SUBPAGE AAARGHHH");
    
    var frontPageButton = $("#subpage-to-front-page");
    var backButton = $("#subpage-back");
    
    if(activeSubpage === 1 || activeSubpage === 4){
      frontPageButton.css("display","block");
      backButton.css("display","none");
    }else{
      frontPageButton.css("display","none");
      backButton.css("display","block");
    }
};

// checks & returns validity, also shows invalidity indicator
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

// gets customer list from DB
function listCustomers(parentElem){   
  var customers = [];
  
  if(parentElem.children().length)
    parentElem.empty(); // dump any content to not list twice
  
  var onHoldElem = $("<span/>");
  onHoldElem.text("Ladataan ...");   
  parentElem.append(onHoldElem);
   
  var response = $.get("/customers").success(function(){     
    //console.log(response.responseText);     
    var json = JSON.parse(response.responseText);
    
    // populate customer data list & build list in HTML  
    for(var i = 0; i < json.length; i++){
      customers.push({
        "id":json[i].pk,
        "name":json[i].fields.username,
        "balance":parseFloat(json[i].fields.balance).toFixed(2)
      });
      
      var listElem = $("<tr/>");
      listElem.addClass("customer-row");
      listElem.attr("data-customer-id",customers[i].id);
      
      var listNameSpan = $("<td/>");
      listNameSpan.addClass("customer-name");
      listNameSpan.text(customers[i].name);
      
      var listBalanceSpan = $("<td/>");
      listBalanceSpan.addClass("customer-balance");
      listBalanceSpan.text("   "+customers[i].balance);
      
      listElem.append(listNameSpan);
      listElem.append(listBalanceSpan);
      parentElem.append(listElem);
    };         
    
    onHoldElem.remove();
     
    // customer list on-click magic
    $(".customer-row").on("click", function(){  
     
     // console.log("ROW CLICK");
      //console.log(this);
      var customerName = $(this).find(".customer-name").text().trim();
      var customerBalance = $(this).find(".customer-balance").text().trim();
      var customerId = $(this).attr("data-customer-id");
      
      $("#page-2-customer-list > *").attr("id","");
      $(this).attr("id","selected-customer");
      
      //$("#page-2-customer-list > *").removeClass("selected-customer");      
      //$(this).addClass("selected-customer");
     
      // save to the global activeCustomer object     
      activeCustomer = {
        "id":parseInt(customerId),
        "name":customerName,
        "balance":parseFloat(customerBalance).toFixed(2)
      };
      
      $("#selected-customer-span").text(activeCustomer.name);
    });
   }).fail(function(){
     onHoldElem.text("Tapahtui virhe.");
   });
   
   //console.log("listCustomers");
}

function listProducts(parentElem, sumTargetElem){
  
  // dump any old content if not spare-able (sum line)
  parentElem.children(":not(."+spareMeClass+")").remove();
  
  var priceSum = 0.0;  
  // work from the back and prepend children to keep the sum line at the bottom
  for(var i = basket.length-1; i >= 0; i--){
    console.log(basket)
    console.log(basket.length)
    console.log(i)
    var tr = $("<tr/>");
    var td1 = $("<td/>");
    var td2 = $("<td/>");    
    td1.text(basket[i].name);
    td2.text(basket[i].price +" €");
    //tr.text(basket[i].name+" "+basket[i].price +" €");
    priceSum = priceSum + basket[i].price;
    tr.append(td1);
    tr.append(td2);
    parentElem.prepend(tr);
  }
  sumTargetElem.text(priceSum.toFixed(2)); 
   
  return;  
  /*
  // dump any old content to not list twice
  if(parentElem.children().length)
    parentElem.empty(); 
   
  var priceSum = 0.0;  
  for(var i = 0; i < basket.length; i++){
    var li = $("<li/>")
    li.text(basket[i].name+" "+basket[i].price +" €");
    priceSum = priceSum + basket[i].price;
    parentElem.append(li);
  }
  console.log(priceSum);
  sumTargetElem.text(priceSum.toFixed(2));
  */
}

function reset(){
  var basket = null;
  var inputCash = null;
  var activeCustomer = null;
};

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
      //if(!activeCustomer)
        //return;
        //selectedUser = $("#selected-customer").text();
    }
    
    if(targetpage === 2){
      listCustomers($("#page-2-customer-list"));
    }
    
    // populate data displays
    if(targetpage === 3){
      listProducts($("#page-3-product-list"), $("#page-3-product-sum"));
      $("#page-3-input-cash").text(inputCash.toFixed(2));
      $("#page-3-customer-name").text(activeCustomer.name);
      
      $("#page-3-customer-balance").text(activeCustomer.balance);
      
      var priceSum = $("#page-3-product-sum").text().trim();
      
      var finalBalance = (
          parseFloat(activeCustomer.balance) 
        + parseFloat(inputCash)
        - parseFloat(priceSum)
      );
      
      /*
      console.log("DA MONIES");
      console.log(activeCustomer.balance);
      console.log(inputCash);
      console.log(priceSum);
      console.log(finalBalance);      
      */
      
      var finalBalanceTargetElem = $("#page-3-final-balance");
      redCheck(finalBalance, finalBalanceTargetElem);      
      finalBalanceTargetElem.text(finalBalance.toFixed(2));      
    }
    
    if(sourcepage === 3 && targetpage === 4){
      var parent = $(this).find(".summary-parent");
      var prefix = "page-3-";
      
      //the "schema":
      /*
      {
      "customerId":1,
      "sum":1.5, // sum of prod prices
      "money":0, // input cash 
      "products":[11,12] // prod id array
      }
      */
      
      // build product id array, calculate price sum
      var sum = 0;
      var prodIdArr = [];     
      for(var i = 0; i < basket.length; i++){
        prodIdArr.push(basket[i].id);
        sum = sum + basket[i].price;
      }
      
      var buyingMessageObject = {
        "customerId" : ""+activeCustomer.id,
        "sum"        : ""+sum.toFixed(2),
        "money"      : ""+inputCash.toFixed(2),
        "products"   : prodIdArr
      };
      
      
      $.ajax({      
        url : "/transactions", 
        type : "POST",
        data: JSON.stringify(buyingMessageObject),
        contentType : "application/json"
      }).success(function(){      
      
          // transaction success gets the customer from the db for the confirmation
          var customerJSON = $.get("/customer?customer_id="+buyingMessageObject.customerId).success(function(){
          
          console.log("customerJSON");
          console.log(customerJSON);
                    
          var customer = customerJSON.responseJSON[0];
          var name = customer.fields.username;
          var balance = customer.fields.balance;
          
          $("#page-4-success-confirmation").text("Osto onnistui. Kiitos!");          
          $("#page-4-success-overview-customer").text("Käyttäjä "+name);
          
          var balanceTarget = $("#page-4-success-overview-balance");          
          redCheck(balance, balanceTarget);          
          balanceTarget.text("Bufferissa rahaa jäljellä "+parseFloat(balance).toFixed(2) + " €");
          
          reset();
          
        }).fail(function(){        
          $("#page-4-success-confirmation").text("Tapahtui virhe.");
        });        
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