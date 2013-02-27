(function ($) {

  $(function () {

    var colorIndex = 0,
      delay = 0.3;
      items = [
        { element: 'body', cssClass: 'bodyColor' },
        { element: '#banner', cssClass: 'borderColor' },
        { element: 'a', cssClass: 'linkColor' },
        { element: '.translucentFrame', cssClass: 'containerColor' },
        { element: 'a.button', cssClass: 'buttonColor' }
      ];

    $(document).data('colorItems', items);

    var $debug = $('<span>')
      .css({
        position: 'absolute',
        padding: '10px',
        right: 0,
        bottom: 0
      })
      .appendTo('body');

    (function changeColors() {
      $debug.text(colorIndex);
      items.forEach(function (item) {
        $(item.element).removeClass(item.cssClass + colorIndex);
      });

      //colorIndex = Math.floor(Math.random()*23);
      colorIndex++;
      if (colorIndex > 25)
        colorIndex = 0;

      items.forEach(function (item) {
        $(item.element).addClass(item.cssClass + colorIndex);
      });

      $(document).data('colorIndex', colorIndex);

      setTimeout(changeColors, delay * 1000);
    })();

  });

})(jQuery);