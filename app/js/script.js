$(document).ready(function () {

    //-----------------login button---------------
    $('.login__text, .nouser-login').on('click', function (e) {
       e.preventDefault();

       var leftPosPopup = $('.login__text').offset().left - 370;

       $(this).toggleClass('active');
       $('.popup-login').toggleClass('open');
       $(".popup-overlay").fadeToggle(400);
       $('.login-form-item__input--tel').focus();

       if($('.login__text').hasClass('register')) { //для залогиненных пользователей
           $('.popup-login').toggleClass('register').css('left', leftPosPopup);
       }
        if($('.login__text').hasClass('login')) { //для незалогиненных пользователей
            $('.popup-login').toggleClass('login').css('left', leftPosPopup);
        }
    });

    $('.popup-overlay').on('click', function () {
        $('.login__text').removeClass('active');
        $('.popup-login').removeClass('open register login');
        $(".popup-overlay").fadeOut(200);
    });

    //------------------------burger------------------

    $('.burger').on('click', function () {

        $('.header').toggleClass('fixed');
        var heightHeader = $('.header.fixed').innerHeight();
        $('.burger-menu').slideToggle(400).toggleClass('open').css("top", heightHeader);
        $('.main, .yandex').toggleClass('open');

        //крестик
        $('.line__main').toggleClass('burger-line2');
        $('.line__middle').toggleClass('burger-line3');

        //для адаптива
        $('.account-accs-select, .account-audit__title-border, .account-accs-employee, #ascrail2000, #ascrail2005, .account, .audit-s, .breadcrumb').toggleClass('hide');

    });

    //---------------------------maskedinput----------------------
    $('.login-form-item__input--tel').mask('+7 000 000-00-00');
    $('.login-form-item__input--sms').mask('0000');

    //--------------------------валидация формы на главной-------------------------
    checkTelField($('.login-form-item__input--tel'));
    checkSmsCode($('.login-form-item__input--sms'));
    checkForm($('.login-form__btn--js'));

    //------------------------------.account-accs select----------------------------
    $('.js-select-selected').on('click', function () {
        $('.select-list-block').fadeToggle(300);
    });

    jQuery(function($){
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(".js-select-selected, .js-select-item"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.select-list-block').fadeOut(100);
            }
        });
    });

    $('.js-select-item').on('click', function () {
        var name = $(this).find('.select-item-info__name').text(),
               email = $(this).find('.select-item-info__email').text();
               img = $(this).find('.select-item__img img').attr("src");

        $('.js-select-item').removeClass('active');
        $(this).addClass('active');

        $('.select-selected-info .select-item-info__name ').text(name);
        $('.select-selected-info .select-item-info__email ').text(email);
        $('.select-selected__img img').attr("src", img);

        $('.select-list-block').fadeOut(100);
    });

    //-------------------------------------account scroll---------------------------------
    $('.employee-list, .employee-sublist').niceScroll({
        cursorcolor: "rgba(37, 38, 42, 0.8)",
        cursorwidth: "4px",
        autohidemode: "scroll",
        railpadding: { top: 5, right: 2, left: 0, bottom: 0 },
        zindex: 10,
        cursorborder: "1px solid rgba(37, 38, 42, 0.8)"
    });

    //-----------------------------------------employee list-----------------------------------------
    $('.employee-list-subitem').on('click', function () {
        $('.employee-list-subitem').removeClass('active');
        $(this).addClass("active");
    });

    //--------------------------------------добавить аккаунт------------------------------
    $('.account-accs__add-btn').on('click', function (e) {
        e.preventDefault();
    });

    //------------------------------mobile tabs-----------------------------
    $('.account-tabs-title__link').on('click', function (e) {
        e.preventDefault();

        var id = $(this).attr('href');

        $('.account-tabs-block, .account-tabs-title__link').removeClass('active');
        $(this).addClass('active');
        $(id).addClass('active');

        if(id == "#accounts") {
            $('.employee-list, .employee-sublist').niceScroll({
                cursorcolor: "rgba(37, 38, 42, 0.8)",
                cursorwidth: "4px",
                autohidemode: "scroll",
                railpadding: { top: 5, right: 2, left: 0, bottom: 0 },
                zindex: 10,
                cursorborder: "1px solid rgba(37, 38, 42, 0.8)"
            });
        } else {
            $(".employee-list, .employee-sublist").getNiceScroll().remove();
        }
    });

    //-----------------------------------всплывашка audit-detail-----------------------------------
    $('.icon').on('click', function () {
        var parent = $(this).parent('.info');
        var positionTop = Math.abs($(parent).position().top - 100),
            positionLeft1 = Math.abs($(this).position().left),
            positionLeft2 = 0,
            posLeft = 0;

        if($(parent).hasClass('table-col-res')) {
            positionLeft2 = Math.abs($(parent).position().left);
            posLeft = (624 + positionLeft1);
            console.log(positionLeft1);
            console.log(posLeft);
            $('.icon-text').css({'top': positionTop, 'left': '624px'});
        }

        if($(parent).hasClass('table-col-name')) {
            positionLeft1 = Math.abs($(this).position().left);
            // posLeft = positionLeft1 + positionLeft2;
            $('.icon-text').css({'top': positionTop, 'left': positionLeft1});
        }

    });

    //----------------------------------------table audit выпадашка-----------------------------------------
    $('.table-row').on('click', function () {
        var height = $(this).next('.table-down').innerHeight() + 528;
        var heightTable = $('.audit-s-table').innerHeight();

       $(this).next('.table-down').slideToggle(300);
        $(this).find('.arrow').toggleClass('cross');
       // $('.audit-s-table').addClass('open');
       //  $(this).next('.table-down').addClass('open');
       //
       //  if($('.audit-s-table').hasClass('open')) {
       //      $(".table-down.open").each(function(){
       //
       //      });
       //      $('.audit-s-table').css('max-height', height);
       //  } else {
       //      $('.audit-s-table').css('max-height', '528px');
       //  }

    });

    //слайдер на странице service
    function media(mediaQueryString, action){
        'use strict';
        var handleMatchMedia = function (mediaQuery) {
            if (mediaQuery.matches) { //Попадает в запроc
                if (action  && typeof(action) === 'function') {
                    action();
                }
            }
        };
        var mql = window.matchMedia(mediaQueryString); //стандартный медиазапрос для смены режима просмотра
        handleMatchMedia(mql);
        mql.addListener(handleMatchMedia);
    }
    media('all and (min-width: 480px)', function() {
        $('.service-slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1045,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 820,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    });

    media('all and (max-width: 479px)', function() {
        if($('.service-slider').hasClass('slick-slider')) {
            $('.service-slider').slick('unslick');
        }
    });

    //слайдер на странице access
    $('.access-slider__wrap').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).find('[data-title]').data('title');
            return '<a class="pager__item"> '+title+' </a>';
        },
        appendDots: $('.dots'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    customPaging: function() {
                        return '<a class="pager__item-mob"></a>';
                    }
                }
            },
            // {
            //     breakpoint: 820,
            //     settings: {
            //         slidesToShow: 2
            //     }
            // },
            // {
            //     breakpoint: 550,
            //     settings: {
            //         slidesToShow: 1
            //     }
            // }
        ]
    });

});

function checkForm (btn) {

    $(btn).on('click', function (e) {
        e.preventDefault();

        if($('.login-form__sms').css('display') == "block") {
            if(!$('.login-form-item__input--sms').hasClass('valid')) {
                $('.login-form-item__input--sms').addClass('error');
                $('.login-form-item__input--sms').parent('.login-form-item').addClass("error");
            } else {
                $('.login-form').fadeOut(200);
                setTimeout(function () {
                    $('.login-yandex').fadeIn(200);
                }, 300);
            }
        } else {
            if(!$('.login-form-item__input--tel').hasClass('valid')) {
                $('.login-form-item__input--tel').addClass('error');
                $('.login-form-item__input--tel').parent('.login-form-item').addClass("error");
                $('.text-sms').text('Неверный номер телефона');
            }
        }

    });

}

function checkSmsCode (input) {

    input.keyup(function () {
        var count = Number($(this).val().length);

        if($(input).hasClass('error')) {
            $(input).removeClass('error');
            $(input).parent('.login-form-item').removeClass('error');
        }

        if (count == 4) {
            $(input).addClass('valid').removeClass('error');
            $(input).parent('.login-form-item').addClass("valid").removeClass('error');
        } else {
            if($(input).hasClass('valid')) {
                $(input).addClass('error').removeClass('valid');
                $(input).parent('.login-form-item').addClass("error").removeClass('valid');
            }
        }
    });

}

function checkTelField (input) {

    input.keyup(function () {
        var count = Number($(this).val().length);
        var sec = $('.timer');
        var secVal = parseInt(sec.text());

        if($(input).hasClass('error')) {
            $(input).removeClass('error');
            $(input).parent('.login-form-item').removeClass('error');
            $('.text-sms').text('Пришлём SMS с кодом для входа');
        }

        if (count == 16) {
            $(input).addClass('valid').removeClass('error');
            $(input).parent('.login-form-item').addClass("valid").removeClass('error');
            $('.text-sms').css('display', 'none');
            $('.login-form__sms').slideDown(400);

            //таймер
            var timer = setTimeout(function tick() {
                if (secVal > 0) {
                    sec.text(--secVal);
                    timer = setTimeout(tick, 1000);
                } else {
                    $('.text-more').css('display', 'none');
                    $('.send-more').css('display', 'inline-block');
                }
            }, 1000);

        } else {
            if($(input).hasClass('valid')) {
                $(input).addClass('error').removeClass('valid');
                $(input).parent('.login-form-item').addClass("error").removeClass('valid');
            }
            $('.login-form__sms').slideUp(300);
            if($(input).hasClass('error')) {
                $('.text-sms').css('display', 'block').text('Неверный номер телефона');
            }
        }
    });

}