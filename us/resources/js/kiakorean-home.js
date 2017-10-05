$(document).ready(function () {
    // Picture element HTML5 shiv
    document.createElement("picture");
    document.createElement("slick");

    $('[tooltip-placement="bottom"]').tooltip({
        placement: 'bottom'
        //template : '<div class="tooltip-arrow"></div><div class="tooltip-inner"></div>'
    });

    $('.sub-menu-list').hide();

    $('.carousel-hero').slick({
        arrows: true,
        infinite: true,
        prevArrow: '.slick-arrow-left',
        nextArrow: '.slick-arrow-right'
    });
//    prevArrow: '<button class=\"slick-prev\" style=\"display: block;\" type=\"button\"></button>',
//    nextArrow: '<button class=\"slick-next\" style=\"display: block;\" type=\"button\"></button>',
//    prevArrow: "<div class='v-prev'></div>",
//    nextArrow: "<div class='v-next'></div>",

    $('.carousel-multislide2').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
        prevArrow: $(".v-prev"),
        nextArrow: $(".v-next"),
        responsive: [
          {
              breakpoint: 1680,
              settings: {
                  slidesToShow: 6,
                  slidesToScroll: 6,
                  infinite: false,
                  dots: false
              }
          },
          {
              breakpoint: 1025,
              settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5
              }
          },
          {
              breakpoint: 760,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
              }
          },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });

    $(".hamburger-menu").click(function () {
        event.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
    });

    $("#overlay-close").click(function (e) {
        e.preventDefault();
        $(".sou-takeover").stop().fadeOut("slow");
    });

    $(".sou-takeover").delay('15000').fadeOut("slow");
    // alert($(window).width() + "--" + $(document).width());   //testing for mobile width

/* 
    var num = $('.l2-nav').offset().top;

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num) {
            $('.l2-nav').addClass('fixed');
        } else {
            $('.l2-nav').removeClass('fixed');
        }
    });
*/
    //$('.shoppingTools').children().click(function () {
    //    event.preventDefault();
    //    $(this).siblings('.sub-menu-list').toggle();
    //});

    //$('.panel').click(function () {
    //    debugger;
    //    $(this).children('.panel-collapse').toggle(); // p00f
    //});
});

