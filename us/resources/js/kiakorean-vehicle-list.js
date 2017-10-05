// following function is to rotate + sign for mobile screen to x when expanded.
$.fn.animateRotate = function (angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function (i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function (now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({ deg: 0 }).animate({ deg: angle }, args);
    });
};

function displayGroup(groupName) {
    if (groupName == "all") {
        $(".vehicle-types").slideDown();
    } else {
        $(".vehicle-types").hide();
        $("#id-" + groupName).slideDown();
    }
}

$(document).ready(function () {

    var selectedGroup = window.location.href.indexOf('#') == -1 ? "" : window.location.href.slice(window.location.href.indexOf('#')+1);
    //alert(window.location.href.indexOf('#'));
    if (selectedGroup != "") {
        displayGroup(selectedGroup);
    }

    vehicleFilter();

    $(".vehicle-cat").click(function (e) {
        if ($(window).width() < 431) {
        if ($(this).parent().find(".section-wrapper").is(":visible")) {
            //$(this).find(".ic-accordion").css({ 'transform': 'rotate(90deg)' });
            $(this).find(".ic-accordion").animateRotate(45);
        } else {
            //$(this).find(".ic-accordion").css({ 'transform': 'rotate(0deg)' });
            $(this).find(".ic-accordion").animateRotate(0);
        }
        $(this).parent().find(".section-wrapper").slideToggle();
        }
        
    });



    

    $("button").click(function (e) {
        //alert($(this).attr('value'));
        //alert(kiaModels[$(this).attr('value')].korean);
        var linkURL = "";
        var clickedObj = kiaModels[$(this).attr('value')];

        if (clickedObj.korean && $(this).hasClass('explore')) {
            linkURL = "/us/kr/vehicle/" + clickedObj.build + "/" + clickedObj.year;
            window.location.href = linkURL;
            return;
        } else if ($(this).hasClass('option')) {
            linkURL = "http://www.kia.com/us/en/build/" + clickedObj.build + "/" + clickedObj.year;
        } else {
            linkURL = "http://www.kia.com/us/en/vehicle/" + clickedObj.build + "/" + clickedObj.year;
        }

        bootbox.hideAll();
        bootbox.confirm(siteMoveMsg, function (result) {
            if (result) {
                //alert(targetURL);
                window.location.href = linkURL;
            } else {
                //just close
            }
        });

    });

    var defaultPrice,defaultMpg, defaultImg, defaultVehicle;

    $(".multi").click(function () {
        // alert($(this).parent().parent().find(".build-image IMG").attr('src'));
        var imgURL = "";
        var clickedObj = kiaModels[$(this).attr('value')];

        imgURL = "/us/k4/images/vehicle-selection/" + clickedObj.build + "_" + clickedObj.year + ".png";    //optima_2016.png
        //defaultImg = $(this).parent().parent().find(".build-image IMG").attr('src');
        //alert($(this).parent().find("button").eq(0).attr('value'));
        defaultVehicle = $(this).parent().find(".build-detail button").eq(0).attr('value');
        $(this).parent().parent().find(".build-image IMG").attr('src', imgURL);
        $(this).parent().parent().find(".build-detail SPAN").eq(0).html(formatCurrency(clickedObj.msrp));
        $(this).parent().parent().find(".build-detail SPAN SPAN").eq(0).html(clickedObj.mpg);
        //$(this).parent().parent().find(".build-detail BUTTON").eq(0).val($(this).attr('value'));
        $(this).parent().parent().find(".build-buttons BUTTON").val($(this).attr('value'));
        $(this).parent().find("a.multi").removeClass('selected');
        $(this).addClass('selected');
        //alert($(this).parent().parent().find(".build-detail BUTTON").eq(0).attr('value'));
    });

    /*
    $(".multi").mouseout(function () {
        var imgURL = "";
        var clickedObj = kiaModels[$(this).parent().find("button").eq(0).attr('value')];
        //alert($(this).parent().find("button").eq(0).attr('value'));
        imgURL = "/us/k4/images/vehicle-selection/" + clickedObj.build + "_" + clickedObj.year + ".png";    //optima_2016.png

        $(this).parent().parent().find(".build-image IMG").attr('src', imgURL);
        $(this).parent().parent().find(".build-detail SPAN").eq(0).html(formatCurrency(clickedObj.msrp));
        $(this).parent().parent().find(".build-detail SPAN").eq(1).html(clickedObj.mpg);
    });
    */


    $(".withinfo").click(function () {
        // alert($(this).parent().parent().find(".build-image IMG").attr('src'));
        var imgURL = "";
        var clickedObj = kiaModels[$(this).attr('value')];

        imgURL = "/us/k4/images/vehicle-selection/" + clickedObj.build + "_" + clickedObj.year + ".png";    //optima_2016.png
        $(this).parent().parent().find(".build-image IMG").attr('src', imgURL);
        if (clickedObj.mpg == "출시 예정") {
            $(this).parent().parent().find(".build-detail SPAN").eq(0).hide();
            $(this).parent().parent().find(".build-detail SPAN").eq(3).show();
        } else {
            $(this).parent().parent().find(".build-detail SPAN").eq(0).show();
            $(this).parent().parent().find(".build-detail SPAN").eq(3).hide();
        }

        $(this).parent().find("a.noinfo").removeClass('selected');
        $(this).addClass('selected');

        //$(this).parent().parent().find("SPAN").eq(0).html(formatCurrency(clickedObj.msrp));
        //$(this).parent().parent().find("SPAN").eq(1).html(clickedObj.mpg);
    });


    $(".noinfo").click(function () {
        // alert($(this).parent().parent().find(".build-image IMG").attr('src'));
        var imgURL = "";
        //var clickedObj = kiaModels[$(this).parent().find("button").eq(0).attr('value')];
        var clickedObj = kiaModels[$(this).attr('value')];

        imgURL = "/us/k4/images/vehicle-selection/" + clickedObj.build + "_" + clickedObj.year + ".png";    //optima_2016.png

        //since coming soon build will be newer, just reset it to coming soon
        $(this).parent().parent().find(".build-image IMG").attr('src', imgURL);
            $(this).parent().parent().find(".build-detail SPAN").eq(0).hide();
            $(this).parent().parent().find(".build-detail SPAN").eq(3).show();

            $(this).parent().find("a.withinfo").removeClass('selected');
            $(this).addClass('selected');


    });
    
    var stickyNavTop = $('#sticky').offset().top;

    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('#sticky').addClass('sticky');
        } else {
            $('#sticky').removeClass('sticky');
        }
    };

    stickyNav();

    $(window).scroll(function () {
        stickyNav();
    });
});