// Bullet points for textarea
$(".recipe-entry").focus(function() {
    if(document.getElementById('todolist').value === ''){
        document.getElementById('todolist').value +='• ';
  }
});

$(".recipe-entry").keyup(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        document.getElementById('todolist').value +='• ';
  }
  var txtval = document.getElementById('todolist').value;
  if(txtval.substr(txtval.length - 1) == '\n'){
    document.getElementById('todolist').value = txtval.substring(0,txtval.length - 1);
  }
});


// fill form with Recipe information

function fillForm() {

  if (window.localStorage.getItem('recipe')) {
      const recipe = JSON.parse(window.localStorage.getItem('recipe'));
      //console.log(recipe);
      let recipeVal;

      if (recipe.type === "Appetizer") {
        recipeVal = '0';
      }
      else if (recipe.type === "Entree") {
        recipeVal = '1';
      }
      else if (recipe.type === "Dessert") {
        recipeVal = '2';
      }
      else if (recipe.type === "Snack") {
        recipeVal = '3';
      }
      else if (recipe.type === "Cocktail") {
        recipeVal = '4';
      }
      else {
        recipeVal = '';
      }

      $('#recipe-title').val(recipe.title);
      $('.recipe-entry').val(recipe.content);
      $('.calories-input').val(recipe.calories);
      $('#firstname').val(recipe.author.split(' ')[0]);
      $('#lastname').val(recipe.author.split(' ')[1]);
      $('.recipe-type').find(`:radio[name=type-of-recipe][value=${recipeVal}]`).prop('checked', true);
  }
}

// Update recipes

function updateRecipeRequest(id, title, content, type, calories, firstName, lastName) {
    if (window.localStorage.getItem('recipe')) {
      const recipe = JSON.parse(window.localStorage.getItem('recipe'));
      let recipeId = recipe.id;

      $.ajax({
          method: 'PUT',
          url: `/recipe/${recipeId}`,
          data: JSON.stringify({
            id: id,
            title: title,
            content: content,
            type: type,
            calories: calories,
            author: {
              firstName: firstName,
              lastName: lastName
            },
          }),
          contentType: 'application/json',
          dataType: 'json',
          success: result => {
              window.location = "/recipes";
          }
      });
  }
}


function addNewRecipe() {
  if (window.localStorage.getItem('recipe')) {
    const recipe = JSON.parse(window.localStorage.getItem('recipe'));
    const recipeId = recipe.id;
    const recipeTitle = $('#recipe-title').val().trim();
    const recipeContent = $('.recipe-entry').val().trim();
    const recipeType = $('input[type=radio]:checked').val();
    let recipeVal;

    if (recipeType === '0') {
      recipeVal = 'Appetizer';
    }
    else if (recipeType === '1') {
      recipeVal = 'Entree';
    }
    else if (recipeType === '2') {
      recipeVal = 'Dessert';
    }
    else if (recipeType === '3') {
      recipeVal = 'Snack';
    }
    else if (recipeType === '4') {
      recipeVal = 'Cocktail';
    }
    const calorieCount = $('.calories-input').val();
    const authorFirstName =  $('#firstname').val().trim();
    const authorLastName = $('#lastname').val().trim();

    updateRecipeRequest(recipeId, recipeTitle, recipeContent, recipeVal, calorieCount, authorFirstName, authorLastName);
  }

}

$('.new-recipe-form').submit(function(event) {
    event.preventDefault();
    addNewRecipe();
});

// logout

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




$(fillForm);