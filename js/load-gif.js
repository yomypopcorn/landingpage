jQuery(document).ready(function (){
  $('.js-animation').click(function(){
    $('html,body').animate({scrollTop: $('.col-phone').offset().top +10},'slow');
    $(this).toggleClass('active');
    $('.help-animation').toggleClass('fadeOut');
    $('.info-animation').toggleClass('fadeOut');

    // start the image-swap.js from static to gif
    $('.animation-container').trigger('click');

    if($(this).hasClass('active')){
      $(this).find('small').text("don't show me");
    } else {
      $(this).find('small').text('show me how');
    }
  });
});
