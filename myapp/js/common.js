$(function() {
    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    if(jQuery('.scroll-to').length) {
        var $page = $('html, body');
        $('.scroll-to[href*="#"]').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
            return false;
        });
    }

});



document.addEventListener('DOMContentLoaded', function(){
//menu
    var menu = document.querySelector('.menu-toggle');
    menu.addEventListener('click', function(){
        var nav = document.querySelector('.main-menu');
        nav.classList.toggle('active');
        var navGamb = document.querySelector('.menu-toggle');
        navGamb.classList.toggle('active');
    });


});

$(function() {
    //select-number form
    if(jQuery('.phone-mask').length) {
        jQuery(function($){
            $(".phone-mask").mask("+38(999) 999-9999");
        });
    }
    //time
    if (window.innerHeight < 821 || window.screen.height < 821) {
        $('.time__num').on('click', function(){
            $(this).parent().siblings().children().removeClass('active');
            $(this).next().toggleClass('active');
        });
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(".time__num"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.time__num').parent().siblings().children().removeClass('active');
            }
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
                        url: '../sendamo.php',
                        dataType: "json",
                        success: function (json) {
                            // if (json.success) {
                                // jQuery(".wizard-section").fadeOut(100);
                                window.location.href = "/quiz-thanks/";
                            // }
                        }
                    });
                    fbq('track', 'Lead');
                    btn.attr('href', "#").removeClass('kviz__btn').css('pointer-events', 'none');
                    btn.parent().css('opacity', '0.5').css('pointer-events', 'none');
                    }
                // fbq('track', 'Lead');

                } else {}
            });
        })
    });


});