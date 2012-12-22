(function ($) {

  $(function () {

    (function animateColors() {

      var $banner = $('#banner'),
        $containers = $('.translucentFrame'),
        $links = $('a'),
        $body = $('body'),
        delay = 3000,
        color = new $.Color(getRandomColor());

      $.when(

          $banner.animate({
            borderColor: color.lightness('.3')
          }, delay),

          $containers.animate({
            backgroundColor: color
          }, delay),

          $links.animate({
            color: color.lightness('.9')
          }, delay),

          $body.animate({
            color: color
          }, delay)

      ).then(animateColors);

    })()

  });

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

})(jQuery);