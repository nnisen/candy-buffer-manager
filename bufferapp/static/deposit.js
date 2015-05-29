// validates input, sends a POST to deposit money
function depositSubmit(){
  
  var input = $("#deposit-money-input");
  var responseBox = $("#response-box");  
  var errorBox = $("#error-box");  
  var id = parseInt($("#selected-customer").attr("data-customer-id"));  
  var deposit = parseFloat(input.val());
  
  input.get(0).setCustomValidity("");
  responseBox.text("");
  errorBox.text("");
  
  if(!$("#selected-customer").length || !id || isNaN(id)){
    errorBox.text("Valitse käyttäjä.");
    return;
  }
  
  if(!deposit || isNaN(deposit) || deposit === 0){
    input.get(0).setCustomValidity("Lisää summa. 0 ei kelpaa.");    
    errorBox.text("Lisää summa.");
    return;
  }
  
  if(deposit < 0){
    input.get(0).setCustomValidity("Summan pitää olla positiivinen");    
    errorBox.text("Summan pitää olla positiivinen.");
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
    // scroll to bottom      
    window.scrollTo(0, $(document).height()-$(window).height());  
  }).fail(function(){        
    // scroll to bottom      
    window.scrollTo(0, $(document).height()-$(window).height());
    errorBox.text("Tapahtui virhe.");
  });
}

$(document).ready(function(){
  listCustomers($("#deposit-customer-list"));
  
  $("#deposit-submit").click(function(){
    depositSubmit();
  });    
});