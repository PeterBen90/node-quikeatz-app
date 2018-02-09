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