(function ($) {

  $(function () {

    var colorIndex = 0,
      delay = 1.5;

    (function changeColors() {
      var
        $body = $('body'),
        $banner = $('#banner'),
        $links = $('a'),
        $translucentFrame = $('.translucentFrame');

      $body.removeClass('bodyColor' + colorIndex);
      $translucentFrame.removeClass('containerColor' + colorIndex)
      $banner.removeClass('borderColor' + colorIndex);
      $links.removeClass('linkColor' + colorIndex);

      colorIndex++; //= Math.floor(Math.random()*13);
      if (colorIndex > 23)
        colorIndex = 0;

      $body.addClass('bodyColor' + colorIndex);
      $translucentFrame.addClass('containerColor' + colorIndex)
      $banner.addClass('borderColor' + colorIndex);
      $links.addClass('linkColor' + colorIndex);

      $(document).data('colorIndex', colorIndex);

      setTimeout(changeColors, delay * 1000);
    })();

//    setTimeout(function () {
//      $('body, #banner, a, .translucentFrame').css({
//        'transition-duration': delay + 's',
//        '-webkit-transition-duration': delay + 's',
//        '-moz-transition-duration': delay + 's',
//        '-o-transition-duration': delay + 's'
//      });
//    }, delay * 1000);

  });

})(jQuery);