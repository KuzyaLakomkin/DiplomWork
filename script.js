$(document).ready(function() {
    $('.slider').slick({ 
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1500,
        responsive: [
            {
                breakpoint: 1025,
                settings: { 
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  arrows:false,
                  dots: true
                }
            },            
            {
                breakpoint: 701,
                settings: { 
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows:false,
                  dots: true
                }
            },
        ]      
    });

	$(".menu__item").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});

    $('.header-contacts__call, .header-contacts__call__mobile, .button, .footer-networks__call').click( function(){
        $('.popup-container').fadeIn(400,
            function(){
               $('.popup')
               .css('display', 'block')
               .animate({opacity: 1, top: '50%'}, 200);
            });
            $('body').addClass('offscroll');
    });
  
    $('.button-popup, #close-button span, #close-button, .popup-container').click(function(event){
        if(event.target == this)
        $('.popup')
        .animate({opacity: 0, top: '45%'}, 200,
        function(){
            $(this).css('display', 'none');
            $('.popup-container').fadeOut(400);
        });
        if(event.target == this)
        $('body').removeClass('offscroll');
    });       

    $('.menu__link').click(function(){
        $('body').removeClass('offscroll');
        $('.popup-menu-cont').removeClass('popup-menu-visible');
        $('#hamburger-button').removeClass('open');
        $('.menu').removeClass('open');
    });
    
    $('#hamburger-button, .popup-menu-cont').click(function(){
        $('#hamburger-button').toggleClass('open');
        $('.menu').toggleClass('open');
        $('body').toggleClass('offscroll');
        $('.popup-menu-cont').toggleClass('popup-menu-visible')
    });

    $("#number").mask("+7 (999) 999-99-99");
    
    $('form').each(function () {
        $(this).validate({
            errorPlacement(error, element) {
                return true;
            },
            focusInvalid: false,
            rules: {
                user_name: {
                    required: true,
                },
                user_phone: {
                    required: true,
                },
            },
            
            submitHandler(form) {
                let th = $(form);

                $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: th.serialize(),
            }).done(() => {

                console.log('Отправленно')
              
              th.trigger('reset');
              $('.popup-container').fadeOut(400);  
            });

            return false;
            }
        });
    });
});