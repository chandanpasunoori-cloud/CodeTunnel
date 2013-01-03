(function ($) {
  $(function () {
    $('a').click(function (e) {
      e.preventDefault();
      var $link = $(this);
      $.ajax({
        url: $link.attr('href'),
        success: function (content) {
          var $content = $('#content');
          $content.html(content);
          var colorIndex = $(document).data('colorIndex');
          $content.find('.translucentFrame').addClass('containerColor' + colorIndex);
        }
      });
    });
  });
})(jQuery);