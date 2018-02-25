// POST recipes

$('.new-recipe-form').submit(function(event) {
    event.preventDefault();
    addNewRecipe();
});

function postRecipeRequest(userId, title, content, type, calories, firstName, lastName) {

    $.ajax({
        method: 'POST',
        url: '/recipe',
        data: JSON.stringify({
          userId: localStorage.getItem('userId'),
          title: title,
          content: content,
          type: type,
          calories: calories,
          author: {
            firstName: firstName,
            lastName: lastName
          }
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: result => {
          console.log(result);
            window.location = "/recipes";
        }
    });
}

function addNewRecipe() {
  const userId = localStorage.getItem('userId');
  const recipeTitle = $('#recipe-title').val().trim();
  const recipeContent = $('.recipe-entry').val();
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

  postRecipeRequest(userId, recipeTitle, recipeContent, recipeVal, calorieCount, authorFirstName, authorLastName);

}

// Bullets points for textarea

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

//logout

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





