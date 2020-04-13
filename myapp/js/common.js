$(function() {
    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });

    //scrollto
    if(jQuery('.scroll-to').length) {
        var $page = $('html, body');
        $('.scroll-to[href*="#"]').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
            return false;
        });
    }

    //select-number form
    if(jQuery('.phone-mask').length) {
        jQuery(function($){
            $(".phone-mask").mask("+38(999) 999-9999");
        });
    }

    //kviz
    if(jQuery('.kviz').length) {
        $('.qa-next').click(function(e){
            e.preventDefault();
            if($(this).parent().parent().prev().find('input:checked').length) {
                $(this).closest('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
            } else {
                $(this).parent().find('.kviz__error').text('Выберите вариант ответа!');
            }

            
        });
        // for radiobuttons
        $('input[type="radio"]+.pick-item__label').click(function(e){
            // $(this).closest('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');           
        });
    }

    //popup
    if(jQuery('.modal__wrap').length) {
        let modalWrap = $('.modal__wrap');
        
        //popup
        $(".modal-open").click(function (e){
          e.preventDefault();
          var btn = $(this);
          
            var numModal = btn.attr('href');
            var modal =  $(numModal);
            modalWrap.removeClass('fadeOutUp');
            modalWrap.addClass('fadeInDown');
            modal.removeClass('disabled');
            modal.addClass('flex');
            $('body').addClass('body-modal-open');
            // body.addClass('body-modal');

        });
      
        $('.modal-close').click(function (){
          modalWrap.removeClass('fadeInDown');
          modalWrap.addClass('fadeOutUp');
          setTimeout(function() {
              $('.modal').addClass('disabled');
            }, 700);
          setTimeout(function() {
              $('.modal').removeClass('flex');
              $('body').removeClass('body-modal-open');
            }, 800);  
      
        });
        $('.modal').mouseup(function (e){ // событие клика по веб-документу
          var div = $(".modal__body"); // тут указываем ID элемента
          var close = $('.modal-close');
          if (close.is(e.target)) {
      
          } else if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
              var modalWrap = $('.modal__wrap');
              modalWrap.removeClass('fadeInDown');
              modalWrap.addClass('fadeOutUp');
              setTimeout(function() {
                  $('.modal').addClass('disabled');
              }, 700);
              setTimeout(function() {
                  $('.modal').removeClass('flex');
                  $('body').removeClass('body-modal-open');
              }, 800); 
            
          }
        });
    }


    // UTM
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    $('form').find('input.utm_source').each(function() {
        var a = getQueryVariable('utm_source');
        if(a){
            $(this).val(a);
        }
    }); 
    $('form').find('input.utm_medium').each(function() {
        var a = getQueryVariable('utm_medium');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_campaign').each(function() {
        var a = getQueryVariable('utm_campaign');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_term').each(function() {
        var a = getQueryVariable('utm_term');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_content').each(function() {
        var a = getQueryVariable('utm_content');
        if(a){
            $(this).val(a);
        }
    });

    //click on form submit button - AMO
    $('.kviz__btn').on('click', function(e){
        e.preventDefault();
        var btn = $(this);
        $($(this).parent().parent().parent()).each(function () {
            var form = $(this);
            console.log(form);
            form.find('.rfield').addClass('empty_field');

                // Функция проверки полей формы

                form.find('.rfield').each(function(){
                if($(this).val() != ''){
                    // Если поле не пустое удаляем класс-указание
                    $(this).removeClass('empty_field');

                if (!form.find('.empty_field').length) {
                    var numModal = btn.attr('href');
                    var modal =  $(numModal);
                    var modalWrap = $('.modal__wrap');
                    modalWrap.removeClass('fadeOutUp');
                    modalWrap.addClass('fadeInDown');
                    $('.modal').addClass('disabled');
                    modal.removeClass('disabled');
                    modal.addClass('flex');
                    $('body').addClass('body-modal-open');
                   
                    form2 = form.closest('form');
                    jQuery.ajax({
                        method: "POST",
                        data: form2.serialize(),
                        // url: quizAjax.url,
                        url: '../send.php',
                        // dataType: "json",
                        // success: function (json) {
                        //     // if (json.success) {
                        //         // jQuery(".wizard-section").fadeOut(100);
                        //         window.location.href = "/quiz-thanks/";
                        //     // }
                        // }
                    });
                    // fbq('track', 'Lead');
                    btn.attr('href', "#").removeClass('kviz__btn').css('pointer-events', 'none');
                    btn.parent().css('opacity', '0.5').css('pointer-events', 'none');
                    }
                // fbq('track', 'Lead');

                } else {}
            });
        })
    });


});
// $(document).mouseleave(function(e) {
//     $('.modalLeave').removeClass('disabled');
//     var modalWrap = $('.modalLeave .modal__wrap');
//     modalWrap.removeClass('fadeOutUp');
//     modalWrap.addClass('fadeInDown');
// });

    // функция возвращает cookie с именем name, если есть, если нет, то undefined    
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    // проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
    var alertwin = getCookie("alertwin");
    console.log(alertwin);
    if (alertwin != "no") { 
        $(document).on('mouseleave', function() {
            $('.modalLeave').removeClass('disabled');
            var modalWrap = $('.modalLeave .modal__wrap');
            modalWrap.removeClass('fadeOutUp');
            modalWrap.addClass('fadeInDown');
            // записываем cookie на 1 день, с которой мы не показываем окно
            var date = new Date;
            date.setDate(date.getDate() + 1);    
            document.cookie = "alertwin=no; path=/; expires=" + date.toUTCString();
       
        });
        $(document).click(function(e) {
            if (($(".modalLeave").is(':visible')) && (!$(e.target).closest(".modalLeave .modal__body").length)) {
                var modalWrap = $('.modalLeave .modal__wrap');
                modalWrap.removeClass('fadeInDown');
                modalWrap.addClass('fadeOutUp');
                setTimeout(function() {
                    $('.modalLeave').addClass('disabled');
                }, 700);
                setTimeout(function() {
                    $('.modalLeave').removeClass('flex');
                    $('body').removeClass('body-modal-open');
                    $(".modalLeave").remove();
              }, 800); 
            }
        });
    } 