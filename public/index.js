// Scroll animation and styling

$("a").on('click', function(event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
        scrollTop: $(hash).offset().top-55
    }, 800, 'swing', function(){
      window.location.hash = hash;
    });
  }
});


$(window).scroll(function(){
    var a = 10;
    var pos = $(window).scrollTop();
    if(pos > a) {
        $('nav ul').addClass('nav-ul-scroll');
        $('.nav-logo').addClass('nav-logo-scroll');
    }
    else {
        $('nav ul').removeClass('nav-ul-scroll');
        $('.nav-logo').removeClass('nav-logo-scroll');
    }
});

// Register form

$('.register-form').on('submit', event => {
    event.preventDefault();

    let username = $('.username').val();
    let password = $('.password').val();

    $.ajax({
        method: 'POST',
        url: '/api/users/',
        data: JSON.stringify({username, password}),
        contentType: 'application/json',
        dataType: 'json',

        success: response => window.location = 'login.html',
        error: error => console.log(error),
    });
});

$('.login-form').on('submit', event => {
    event.preventDefault();

    let username = $('.username').val();
    let password = $('.password').val();

    $.ajax({
        method: 'POST',
        url: '/api/auth/login',
        data: JSON.stringify({username, password}),
        contentType: 'application/json',
        dataType: 'json',

        success: response => {
            localStorage.setItem('token', response.authToken)
            window.location = "recipes.html";
        }
    });
});

$('#demo-button').on('click', event => {
    window.location = "login.html";
});

$('.register-button').on('click', event => {
    window.location = "index.html#register"
});



