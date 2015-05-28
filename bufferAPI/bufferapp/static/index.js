var categories = [];
var selectClass = "selected-category";

function getCategoryButton(category){
  var div = $("<div/>");
  var btn = $("<button/>");
  btn.attr("type","button");
  btn.addClass("btn");
  btn.addClass("lightergreen");
  btn.addClass("category-button");  
  btn.addClass(selectClass);  
  btn.attr("data-category",category.id);  
  btn.text(category.name);
  div.append(btn);
  
  btn.click(function(){
    if($(this).hasClass(selectClass))
      $(this).removeClass(selectClass);
    else
      $(this).addClass(selectClass);
    
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