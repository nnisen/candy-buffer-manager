// validates input, sends a POST to deposit money
function depositSubmit(){
  
  var input = $("#deposit-money-input");
  var responseBox = $("#response-box");  
  var id = parseInt($("#selected-customer").attr("data-customer-id"));  
  var deposit = parseFloat(input.val());
  
  input.get(0).setCustomValidity("");
  responseBox.text("");
  
  if(!$("#selected-customer").length || !id || isNaN(id)){
    responseBox.text("Valitse käyttäjä.");
    return;
  }
  
  if(!deposit || isNaN(deposit)){
    input.get(0).setCustomValidity("Lisää summa. 0 ei kelpaa.");    
    responseBox.text("Lisää summa.");
    return;
  }
  
  var depositObject = {
    "customerId"   : ""+id,
    "money"        : ""+deposit.toFixed(2)
  };
  
  responseBox.text("Ladataan ...");
  
  $.ajax({      
    url : "/deposit", 
    type : "POST",
    data: JSON.stringify(depositObject),
    contentType : "application/json"
  }).success(function(){        
    responseBox.text("Onnistui! Sinut palautetaan pian etusivulle.");
    listCustomers($("#deposit-customer-list"));
    setTimeout(function(){
      window.location.href = "/";
    }, 2000);
    
  }).fail(function(){        
    responseBox.text("Tapahtui virhe.");
  });
}

$(document).ready(function(){
  listCustomers($("#deposit-customer-list"));
  
  $("#deposit-submit").click(function(){
    depositSubmit();
  });    
});