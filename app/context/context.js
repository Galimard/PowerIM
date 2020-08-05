$(document).ready(function () {
    $('.parnter-slider').slick({
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true,
        appendArrows: $('.partner-slider-arrows'),
        dots: true,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    $('.slider-example').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        appendArrows: $('.slider-example-arrows'),
        dots: true,
        appendDots: $('.slider-example-dots'),
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    dots: false
                }
            },
            {
                breakpoint: 750,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
});