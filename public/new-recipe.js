function postRecipeRequest(title, content, type, calories, firstName, lastName) {
  $('.new-recipe-form').submit(function(event) {
    event.preventDefault();
    addNewRecipe();
  });

    $.ajax({
      method: 'POST',
      url: '/recipe',
      data: JSON.stringify({
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
      success: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
}

function addNewRecipe() {
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

  postRecipeRequest(recipeTitle, recipeContent, recipeVal, calorieCount, authorFirstName, authorLastName);

}

