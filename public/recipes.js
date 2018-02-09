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
  for (index in data) {
       $('body').append(
        '<p>' + data[index].title + '</p>');
    }
}


function getAndDisplayRecipeEntries() {
  getRecipeEntries(displayRecipeEntries);
}

$(function() {
    getAndDisplayRecipeEntries();
})