// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_NEW_RECIPES = {
  "newRecipes": [
        {
            "id": "1111111",
            "title": "Kale Ceasar Salad",
            "type": "Appetizer",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id scelerisque leo, vel pharetra leo. Duis vitae metus auctor, bibendum dolor ut, faucibus risus. Integer varius dictum risus ut placerat. Sed orci nulla, placerat tincidunt tellus id, elementum iaculis magna. Morbi ac lectus convallis, sodales ligula ac, bibendum leo. Integer et blandit lacus, nec luctus massa.",
            "calories": 44,
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "title": "Rosemary Steak",
            "type": "Entree",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id scelerisque leo, vel pharetra leo. Duis vitae metus auctor, bibendum dolor ut, faucibus risus. Integer varius dictum risus ut placerat. Sed orci nulla, placerat tincidunt tellus id, elementum iaculis magna. Morbi ac lectus convallis, sodales ligula ac, bibendum leo. Integer et blandit lacus, nec luctus massa.",
            "calories": 250,
            "publishedAt": 1470016976609

        },
        {
            "id": "333333",
            "title": "Fettuccini Alfredo with Shrimp",
            "type": "Entree",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id scelerisque leo, vel pharetra leo. Duis vitae metus auctor, bibendum dolor ut, faucibus risus. Integer varius dictum risus ut placerat. Sed orci nulla, placerat tincidunt tellus id, elementum iaculis magna. Morbi ac lectus convallis, sodales ligula ac, bibendum leo. Integer et blandit lacus, nec luctus massa.",
            "calories": 150,
            "publishedAt": 1470016976609

        },
        {
            "id": "4444444",
            "title": "Chocolate Cheesecake",
            "type": "Dessert",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id scelerisque leo, vel pharetra leo. Duis vitae metus auctor, bibendum dolor ut, faucibus risus. Integer varius dictum risus ut placerat. Sed orci nulla, placerat tincidunt tellus id, elementum iaculis magna. Morbi ac lectus convallis, sodales ligula ac, bibendum leo. Integer et blandit lacus, nec luctus massa.",
            "calories": 320,
            "publishedAt": 1470016976609

        }
    ]
};

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getRecentRecipesPosts(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
  setTimeout(function(){ callbackFn(MOCK_NEW_RECIPES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayNewRecipes(data) {
    for (index in data.newRecipes) {
       $('body').append(
        '<p>' + data.newRecipes[index].title + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayNewRecipes() {
  getRecentRecipesPosts(displayNewRecipes);
}

//  on page load do this
$(function() {
  getAndDisplayNewRecipes();
})