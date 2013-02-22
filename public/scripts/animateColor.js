(function ($) {

  $(function () {

    var colorIndex = 0;

    (function changeColors() {
      var
        $body = $('body'),
        $banner = $('#banner'),
        $links = $('a'),
        $translucentFrame = $('.translucentFrame'),
        delay = 15000;

      $body.removeClass('bodyColor' + colorIndex);
      $translucentFrame.removeClass('containerColor' + colorIndex)
      $banner.removeClass('borderColor' + colorIndex);
      $links.removeClass('linkColor' + colorIndex);

      colorIndex = Math.floor(Math.random()*13);

      $body.addClass('bodyColor' + colorIndex);
      $translucentFrame.addClass('containerColor' + colorIndex)
      $banner.addClass('borderColor' + colorIndex);
      $links.addClass('linkColor' + colorIndex);

      $(document).data('colorIndex', colorIndex);

      setTimeout(changeColors, delay);
    })();
  });

})(jQuery);