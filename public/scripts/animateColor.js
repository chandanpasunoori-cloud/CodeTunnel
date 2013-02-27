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

    (function changeColors() {
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