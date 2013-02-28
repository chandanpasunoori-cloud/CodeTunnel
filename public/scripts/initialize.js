(function ($) {
  $(function () {
    var initializeEvent = {
      type: 'initialize',
      firstLoad: true,
      debug: false
    };
    $(document).trigger(initializeEvent);
  });
})(jQuery);