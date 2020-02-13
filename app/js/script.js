$(document).ready(function () {

    //-----------------login button---------------
    $('.login__text, .nouser-login').on('click', function (e) {
       e.preventDefault();

       $(this).toggleClass('active');
       $('.popup-login').toggleClass('open');
       $(".popup-overlay").fadeToggle(400);
       $('.login-form-item__input--tel').focus();
    });

    $('.popup-overlay').on('click', function () {
        $('.login__text').removeClass('active');
        $('.popup-login').removeClass('open');
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

    // var positions = [], //сюда сложим на загрузке страницы позиции наших "якорных" блоков, чтобы не считать их каждый раз. и сюда же положим ссылки на соответствующие a.scroll-to
    //     currentActive = null; //здесь будет храниться id текущего блока, чтобы не менять классы по 100 раз за одну прокрутку
    //     blocks = $('.employee-list-item__wrap'); //сохраним массив всех a.scroll-to
    // var listTop = $('.employee-list').offset().top;
    //
    // $(".employee-list-item__wrap").each(function(){ //перебираем блоки, сохраняем позиции и ссылки на пункты меню
    //     positions.push({
    //         top: $(this).offset().top,
    //         blocks: blocks
    //     });
    //     // positions.push($(this).offset().top);
    // });
    //
    // positions = positions.reverse();

    // $('.employee-list').on('scroll', function () {
    //
    //     var winTop = $('.employee-list').scrollTop();
    //     for(var i = 0; i < positions.length; i++){
    //
    //         if(positions[i].top < winTop){ //если прокрутка страницы ниже нашего блока
    //             if(currentActive !== i){ //и если мы еще не добавили класс текущему блоку
    //                 currentActive = i;
    //                 blocks.filter('.sticky').removeClass('sticky'); //снимаем класс .active с текущего пункта меню
    //                 positions[i].blocks.addClass("sticky");
    //             }
    //             break; //выходим из цикла, не нужно проверять блоки, которые выше
    //         }
    //     }
    //
    //     // $('.employee-list-item__wrap').addClass('sticky');
    // });

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