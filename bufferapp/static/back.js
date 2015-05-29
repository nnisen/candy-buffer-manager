var activeSubpage = 1;
var basket;
var inputCash;
var activeCustomer;
var spareMeClass = "spare-me-please" // class to skip when deleting elems

// colors elem text red on a subzero number value
function redCheck(value, elem){  

  var origAttrName = "data-original-color";
  var badColor = "red";
  
  if(elem.css("color") !== badColor)
    elem.attr(origAttrName, elem.css("color"));
            
  if(parseFloat(value) < 0){ 
    elem.css("color",badColor);
  }else{
    elem.css("color",elem.attr(origAttrName));
  }
}

function changeSubpage(srcnum, tgtnum){
    
    $("#page-"+srcnum).hide();
    
    // subpages are numbered 1 to 4
    if(tgtnum <= 4 && tgtnum > 0){     
      $("#page-"+tgtnum).show();
      activeSubpage = tgtnum;
    }
    else 
      throw new Error("tgtnum = "+tgtnum+" - NO SUCH SUBPAGE");
    
    var frontPageButton = $("#subpage-to-front-page");
    var backButton = $("#subpage-back");
    
    if(activeSubpage === 1 || activeSubpage === 4){
      frontPageButton.css("display","block");
      backButton.css("display","none");
    }else{
      frontPageButton.css("display","none");
      backButton.css("display","block");
    }
    
    // scroll to top
    window.scrollTo(0,0);
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

// resets state, empties data
function reset(){
  var basket = null;
  var inputCash = null;
  var activeCustomer = null;
  Cookies.remove("basket");
};

$(document).ready(function(){
  
  // scroll to top
  window.scrollTo(0,0);
  
  // we assume that the basket is valid
  basket = JSON.parse(Cookies.get("basket"));
  
  listProducts($("#page-1-product-list"), $("#page-1-product-sum"));
  
  // straight-from-buffer option
  $("#page-1-payfrombuffer").click(function(){      
    $("#page-1-money-input").val("0");
    $("#page-1-money-submit").click();      
  });
    
  // back button click handling  
  $("#subpage-back").on("click", function(){
    if(activeSubpage > 1)
      changeSubpage(activeSubpage, activeSubpage-1);
  });
  
  // validates money input on change
  $("#page-1-money-input").change(function(){
    validateMoneyInput();
  });
  
  // page changer button click handling
  $(".subpage-submit").on("click", function(){

    var sourcepage = parseInt($(this).attr("sourcepage"));
    var targetpage = parseInt($(this).attr("targetpage"));
    
    if($(this).attr("id") == "page-1-money-submit"){
      if(!validateMoneyInput())
        return;
      
      inputCash = parseFloat($("#page-1-money-input").val());
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
      
      var finalBalanceTargetElem = $("#page-3-final-balance");
      redCheck(finalBalance, finalBalanceTargetElem);      
      finalBalanceTargetElem.text(finalBalance.toFixed(2));      
    }
    
    if(targetpage === 4){
      var parent = $(this).find(".summary-parent");
      var prefix = "page-3-";
      
      // build product id array, calculate price sum
      var sum = 0;
      var prodIdArr = [];     
      for(var i = 0; i < basket.length; i++){
        prodIdArr.push(basket[i].id);
        sum = sum + basket[i].price;
      }

      /*//the schema of a "buying object":
      {
      "customerId":1,
      "sum":1.5, // sum of prod prices
      "money":0, // input cash 
      "products":[11,12] // prod id array
      }
      */
      
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
          // buying has been completed with success!
      
          // re-gets the customer from the db for validation          
          var customerJSON = $.get("/customer?customer_id="+buyingMessageObject.customerId).success(function(){
          
          var customer = customerJSON.responseJSON[0];
          var name = customer.fields.username;
          var balance = customer.fields.balance;          
          var balanceTarget = $("#page-4-success-overview-balance");                    
          redCheck(balance, balanceTarget);
          
          $("#page-4-success-confirmation").text("Osto onnistui. Kiitos!");          
          $("#page-4-success-overview-customer").text("Olit käyttäjä "+name+",");          
          balanceTarget.text("Bufferissasi on rahaa jäljellä "+parseFloat(balance).toFixed(2) + " €");
          
          reset();          
        }).fail(function(){        
          $("#page-4-success-confirmation").text("Tapahtui virhe.");
        });        
      }).fail(function(){
        $("#page-4-success-confirmation").text("Tapahtui virhe.");
      });
    }    
    changeSubpage(sourcepage, targetpage);
  });
});