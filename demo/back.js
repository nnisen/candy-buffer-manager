console.log("back.js");

var activeSubpage = 1;

function changeSubpage(srcnum, tgtnum){
    
    $("#page-"+srcnum).hide();
    
    if(tgtnum <= 4){
      
      $("#page-"+tgtnum).show();        
      
      if(tgtnum !== 1){

      }
    }
    else throw new Error("NO PAGE AAARGAAHHH");
};

$(document).ready(function(){
  $(".subpage-submit").on("click", function(){
    
    var srcpage = $(this).attr("sourcepage");
    var targetpage = $(this).attr("targetpage");        
    changeSubpage(srcpage, targetpage);
    
    //console.log("clicked:");
    //console.log(this);
  });
});