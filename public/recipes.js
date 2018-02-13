//GET Recipes

function getRecipeEntries(callbackFn) {
  $.ajax({
    url: "/recipe",
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
        var results = data;
        callbackFn(results);
      }
    }
  });
}

function displayRecipeEntries(data) {
  console.log(data.recipes);
  for (index in data.recipes) {
       $('body').append(
        '<h3 class="recipe-title">' + data.recipes[index].title + '</h3>' +
        '<p class="recipe-type">' + data.recipes[index].type + '</p>' +
        '<p class="recipe-content">' + data.recipes[index].content + '</p>' +
        '<p class="recipe-calories">' + data.recipes[index].calories + '</p>' +
        '<p class="recipe-author">' + data.recipes[index].author + '</p>'
        );
  }
}


function getAndDisplayRecipeEntries() {
  getRecipeEntries(displayRecipeEntries);
}

$(function() {
    getAndDisplayRecipeEntries();
})

//DELETE Recipes