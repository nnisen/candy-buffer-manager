console.log("back.js");

var activeSubpage = 1;

function changeSubpage(srcnum, tgtnum){
    
    $("#page-"+srcnum).hide();
    
    if(tgtnum <= 4){
      
      $("#page-"+tgtnum).show();        
      
      if(tgtnum !== 1){

      }
      
      activeSubpage = tgtnum;
    }
    else throw new Error("NO PAGE AAARGAAHHH");
};

$(document).ready(function(){
  
  $(".customer-row span").on("click", function(){
  
    var customerName = $(this).text();
    //var customerId = $(this).parent().attr("data-customer-id");
    $("#selected-customer").text(customerName);
    
  });
  
  $("#subpage-back").on("click", function(){
    if(activeSubpage > 1)
      changeSubpage(activeSubpage, activeSubpage-1);
  });
  
  $(".subpage-submit").on("click", function(){
    
    var srcpage = $(this).attr("sourcepage");
    var targetpage = $(this).attr("targetpage");        
    changeSubpage(srcpage, targetpage);
    //console.log("clicked:");
    //console.log(this);
  });
});