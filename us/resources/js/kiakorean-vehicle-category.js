(function ($) {
    $(document).ready(function () {
        /**
         * Show the list of vehicle that choosed by `selector` and hide the others.
         */
        var showVehicleList = function (selector) {
            var parent = selector.closest('.vehicle-container');
            $('.vehicle-list', parent).each(function () {
                if ($(this).hasClass('slick-initialized')) {
                    $(this).slick('unslick')
                }
                $(this).hide();
            });

            // Give small amount of time for unslick process before re-initalize slick carousel
            setTimeout(function() {
                selector.fadeIn();

                var numberOfSlidesLarge = $('.carousel-slide-bgimage', selector).length;
                var numberOfSlides1280 = 5;
                var numberOfSlides1024 = 4;
                var numberOfSlides768 = 3;

                if (numberOfSlidesLarge >= 7 || numberOfSlidesLarge <= 3) {
                    numberOfSlidesLarge = 7;
                }
                if (numberOfSlidesLarge < numberOfSlides1280) {
                    numberOfSlides1280 = numberOfSlidesLarge;
                }
                if (numberOfSlidesLarge < numberOfSlides1024) {
                    numberOfSlides1024 = numberOfSlidesLarge;
                }
                if (numberOfSlidesLarge < numberOfSlides768) {
                    numberOfSlides768 = numberOfSlidesLarge;
                }

                selector.slick({
                    infinite: false,
                    slidesToShow: numberOfSlidesLarge,
                    slidesToScroll: numberOfSlidesLarge,
                    responsive: [
                        {
                            breakpoint: 1280,
                            settings: {
                                infinite: false,
                                slidesToShow: numberOfSlides1280,
                                slidesToScroll: numberOfSlides1280,
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                infinite: false,
                                slidesToShow: numberOfSlides1024,
                                slidesToScroll: numberOfSlides1024,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                infinite: false,
                                slidesToShow: numberOfSlides768,
                                slidesToScroll: numberOfSlides768,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                infinite: false,
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                    ]
                });
            }, 100);
        };

        // Show the first of vehicle list on page load
        $('#vehicle-category').on('init', function () {
            showVehicleList($('div.vehicle-list').eq(0));
        });

        // Show list of vehicle according to the category currently selected
        $('#vehicle-category').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var target = $('span', $(slick.$slides[nextSlide])).data('target');
            if (target !== undefined) {
                showVehicleList($('div[data-vehicle-category="' + target + '"].vehicle-list'));
            }
        });

        // Show list of vehicle according to the category currently clicked
        $('#vehicle-category span').on('click', function (e) {
            var target = $(this).data('target');
            if (target !== undefined) {
                showVehicleList($('div[data-vehicle-category="' + target + '"].vehicle-list'));
            }
        });

        // Initialize carousel for vehicles category
        $('#vehicle-category').slick({
            arrows: false,
            focusOnSelect: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        focusOnSelect: false,
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    })
})(jQuery);