// Accordian Animation
$(document).on('click', 'button', function () {
    $(this).toggleClass("max").next().slideToggle(200);
});

// GET and DELETE Recipes

function getRecipeEntries(callbackFn) {
  $.ajax({
    url: "/recipe",
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
        let results = data;
        callbackFn(results);
      }
    }
  });
}

function displayRecipeEntries(data) {

  for (index in data.recipes) {
    //console.log(data.recipes[index]);
       $('.container').append(`
            <button class="btn">${data.recipes[index].title}</button>
            <div class="acd-content">
                <p class="recipe-type">Recipe type: ${data.recipes[index].type}</p>
                <p class="recipe-content">${data.recipes[index].content}</p>
                <p class="recipe-calories">Calories: ${data.recipes[index].calories}</p>
                <p class="recipe-author">Author: ${data.recipes[index].author}</p>
                <button class="delete-btn">Delete</button>
            </div>
        `);
  }
}

function deleteRecipeEntries(data) {
  for (index in data.recipes) {
    $('.delete-btn').on('click', function(event) {
      $.ajax({
        url: `/recipe/${data.recipes[index].id}`,
        type: 'DELETE',
        dataType: 'json',
        contenttype: 'application/json',

        success: data => {
          window.location = "/recipes";
        }
      });
    });
  }
}


function getAndDisplayRecipeEntries() {
  getRecipeEntries(displayRecipeEntries);
}

function getAndDeleteRecipeEntries() {
  getRecipeEntries(deleteRecipeEntries);
}


$(getAndDisplayRecipeEntries);
$(getAndDeleteRecipeEntries);

