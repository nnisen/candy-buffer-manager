var categories = [];
var selectClass = "selected-category";
var dataAttr = "data-product-categories";

function updateDisplay(){
  var prods = $(".product");
  var categoryButtons = $("."+selectClass);
  
  var activeCategories = [];
  
  for(var i = 0; i < categoryButtons.length; i++){
     activeCategories.push(parseInt($(categoryButtons[i]).attr(dataAttr)));
  }
  /*
  console.log("activeCategories:");
  console.log(activeCategories);
  */
  // show/hide prods
  for(var i = 0; i < prods.length; i++){
    var found = false;
    //console.log(prods[i]);
    //console.log($(prods[i]).attr(dataAttr));    
    var catgIds = JSON.parse($(prods[i]).attr(dataAttr).replace(",]","]"));
    //console.log("catgIds:");
    //console.log(catgIds);
    
    for(var j = 0; j < catgIds.length; j++){
      if($.inArray(catgIds[j], activeCategories) > -1){        
        found = true;                
        break;
      }
    }       

    if(found){
      $(prods[i]).show();
    } else {
      $(prods[i]).hide();    
    }    
  }  
}

function getCategoryButton(category){
  var div = $("<div/>");
  var btn = $("<button/>");
  btn.attr("type","button");
  btn.addClass("btn");
  btn.addClass("lightergreen");
  btn.addClass("category-button");  
  btn.addClass(selectClass);  
  btn.attr(dataAttr,category.id);  
  btn.text(category.name);
  div.append(btn);
  
  btn.click(function(){
    if($(this).hasClass(selectClass))
      $(this).removeClass(selectClass);
    else
      $(this).addClass(selectClass);
    
    updateDisplay(this);
  });  
  return div;
}

function initCategories(){
  var cagresp = $.get("/categories").success(function(){
    var cags = JSON.parse(cagresp.responseText);
    console.log(cagresp);
    console.log(cags);
    
    for(var i = 0; i < cags.length; i++){      
      categories.push({
        id : cags[i].pk,
        name : cags[i].fields.name
      });
    }
    
    for(var i = 0; i < categories.length; i++){            
      $(".category-buttons").append(getCategoryButton(categories[i]));
    }
    
  });
}

$(document).ready(function(){
  var box = $("#productbox");  
  
  var all = $.get("products").success(function(){
    $(all.responseText).appendTo(box);   
    $(".add-product-to-basket").on("click", function(){
      productAddButtonFunction(this);    
    });
  });
  
  
  initCategories();
});