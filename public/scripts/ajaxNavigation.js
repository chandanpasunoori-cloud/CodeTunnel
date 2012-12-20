(function ($) {
  $(function () {
    $('a').click(function (e) {
      e.preventDefault();
      var $link = $(this);
      $.ajax({
        url: $link.attr('href'),
        success: function (content) {
         $('#content').html(content);
        }
      });
    });
  });
})(jQuery);