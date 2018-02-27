// Autoscroll and nav styling

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

$('.nav-logo').click(function(event) {
  event.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, 800
    );
});


$(window).scroll(function(){
    let a = 10;
    let pos = $(window).scrollTop();
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

// Authentication

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
            localStorage.setItem('userId', response.userId)
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

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});

$('nav ul a').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});



