// Accordian Animation
$(document).on('click', 'button', function () {
  $('html, body').animate({
      scrollTop: $('.container').offset().top
    }, 500);
    $(this).toggleClass("max").next().slideToggle(500);
});

// Store JSON object from hidden div as a string
// transfers stroed raw data to edit-recipe

$(document).on('click', '.edit-btn', function(event) {
  window.localStorage.setItem('recipe', $(this).siblings('#raw-data').text())
  window.location = '/recipes/edit';
});

// GET and DELETE Recipes

function getRecipeEntries(callbackFn) {
  $.ajax({
    url: "/recipe",
    type: 'GET',
    dataType: 'json',

    success: data => {
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
          <div id="${data.recipes[index].id}">
            <button class="btn">${data.recipes[index].title}</button>
            <div class="acd-content">
                <p class="recipe-type">Recipe type: ${data.recipes[index].type}</p>
                <p class="recipe-content">${data.recipes[index].content}</p>
                <p class="recipe-calories">Calories: ${data.recipes[index].calories}</p>
                <p class="recipe-author">Author: ${data.recipes[index].author}</p>
                <button id="${data.recipes[index].id}" class="delete-btn">Delete</button><button class="edit-btn">Edit</button>
                <div id="raw-data" hidden>${JSON.stringify(data.recipes[index])}</div>
            </div>
          </div>
        `);
  }
}

function deleteRecipeEntries(data) {
  for (index in data.recipes) {
    $('.delete-btn').on('click', function(event) {
      let recipeId = $(this).attr('id');

      $.ajax({
        url: `/recipe/${recipeId}`,
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',

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

const token = localStorage.getItem('token');

$.ajax({
  method: 'GET',
  url: '/api/protected',
  headers: {
    Authorization: `Bearer ${token}`
  },
  success: response => $('.header').html(response.data),
  error: error => window.location = "/"
});

$('.log-out').on('click', () => {
  localStorage.removeItem('token');
  window.location = "/"
})

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});

$('nav ul a').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});


$(getAndDisplayRecipeEntries);
$(getAndDeleteRecipeEntries);

