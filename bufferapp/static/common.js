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
      
      parentElem.children().attr("id","");
      
      //$("#page-2-customer-list > *").attr("id","");
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
    /*
    console.log(basket)
    console.log(basket.length)
    console.log(i)
    */
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
}