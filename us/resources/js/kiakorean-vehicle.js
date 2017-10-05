$(document).ready(function () {
    // Picture element HTML5 shiv
    document.createElement("picture");

    picturefill();

    // ===== for mobile size, unlslick 
    var settingsSlide = {
        arrows: false,
        infinite: false,
        swipe: false,
        fade: true,
        speed: 1,
        responsive: [
             {
                 breakpoint: 767,
                 settings: {
                     swipe: true
                 }
                     //"unslick"
             }
        ]
    };

    var settingsUnslick = {
        arrows: false,
        infinite: false,
        swipe: false,
        fade: true,
        speed: 1,
        responsive: [
             {
                 breakpoint: 767,
                 settings: "unslick"
             }
        ]
    };

    if ($(".story-multiimage").length) {
        $('.story-multiimage').each(function () {
            $(this).slick(settingsUnslick);
        });
    }

    if ($(".story-multislide").length) {
        $('.story-multislide').each(function () {
            $(this).slick(settingsSlide);
        });
    }


    $(window).on('resize', function () {
        if ($('.story-multiimage').length ) {
            if ($(window).width() < 767) {
                if ($('.story-multiimage').hasClass('slick-initialized')) {
                    $('.story-multiimage').slick('unslick');
                }
                return;
            }
            if (!$('.story-multiimage').hasClass('slick-initialized')) {
                return $('.story-multiimage').slick(settingsUnslick);
            }
        }
    });


    $("UL.multi-page-list LI").click(function () {
        var currentObj = $(this).prevAll().length;
        var targetTextDiv = $(this).parent().parent().find("div.multi-page-text").eq(currentObj);
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        $(this).parent().parent().find("div.multi-page-text").removeClass("visible");
        targetTextDiv.addClass("visible");
                //alert(currentObj + 1);
        $(this).parent().parent().parent().parent().find('.story-multiimage').slick('slickGoTo', currentObj);
                //alert($(this).prevAll().length + 1);
                //alert($(this).parent().parent().find("div.multi-page-text").eq(0).html());
                //$(this).parent().parent().find("div.multi-page-text").eq(0).css("display","block");
    });

    // if knob style slider is present
    if ($("#interior-slider").length) {
        $("#interior-slider").slider()
        .on('slide', function(ev){
            //console.log( $(this).val() );
            //alert( $(this).val() + " ----  "  + $(".slider").val() );
            $(this).parent().parent().parent().parent().find('.story-multislide').slick('slickGoTo', $(this).val());
        });
    }

    // following item is for a second slider.  If this happens more often, we should convert this to a function

    if ($("#additional-slider").length) {
        $("#additional-slider").slider()
        .on('slide', function (ev) {
            //console.log( $(this).val() );
            //alert( $(this).val() + " ----  "  + $(".slider").val() );
            $(this).parent().parent().parent().parent().find('.story-multislide').slick('slickGoTo', $(this).val());
        });
    }
    $('span.icon_chevron-left, span.icon_chevron-right').click(function () {
       // debugger;
        var $elemClass = $(this).attr('class');

        var left = parseInt($('.ui-scroll-to-fit').css('left'));
        var navWidth = parseInt($('.l2-navigation-container').css('width'));
        var minLeft = 0;

        if (navWidth < 767) {
            minLeft = 35;
        }

        if ($elemClass === 'icon icon_chevron-right') {
            if (left - navWidth - 100 > -1100) {
                $(".ui-scroll-to-fit").animate({ "left": "-=100px" }, 400);
            }
        }
        else {
            if (left + 100 > minLeft) {
                $(".ui-scroll-to-fit").animate({ "left": minLeft + "px" }, 6400);
            }
            else {
                $(".ui-scroll-to-fit").animate({ "left": "+=100px" }, 400);
            }
        }
    });
    /*
    $(window).resize(function () {
        var target = $('.story-multiimage');
        if (target.hasClass('slick-initialized')) {
            target.unslick();
        }
    });
    */


    var externalLink = "";

    $('span.chapter-link').click(function () {
        externalLink = "";
        externalLink = $(this).attr("nav-link");
    });

    $("a.tile-link").click(function () {
        $(this).attr("href", $(this).attr("href") + externalLink).attr("data-transition", "slideup");
    });

    if ($("UL.exterior-colors LI").length) {
        // if color boxes exist, add red border on the first box as page loads
        $("UL.exterior-colors LI").eq(0).find("i").addClass("active");

        $("UL.exterior-colors LI").click(function (e) {
            //alert("in");
            //$(this).parent().parent().find("div.multi-page-text").eq(0).html());
            //$(".c-feffff").hide();
            //$(".c-965f3c").show();

            //remove existing red border
            $("UL.exterior-colors LI I").removeClass('active');
            $(this).find("i").addClass('active');
            var clickedColor = e.target.id;
            //alert(clickedColor);
             $(".content-holder dummy").load('vehicle-colors.html #' + clickedColor);
        });
    }
    //alert($(".miy-container").html());
    if ($(".miy-container").length && $(".miy-container").html() == "") {
        includeHTML(".miy-container", "kr_makeityours.html");
    }
    
});

