(function ($) {
  $(function () {
    $(document).on('click', 'a.hijax', function (e) {
      e.preventDefault();
      if (!$(document).data('loading')) {
        $(document).data('loading', true);
        var $link = $(this);
        var $content = $('#content');
        var $loading = $('<div>')
          .css({
            marginLeft: '45%',
            padding: '10px',
            textAlign: 'left',
            fontStyle: 'italic',
            display: 'none'
          })
          .text('Loading')
          .insertAfter($content)
          .fadeIn('fast');
        $content.slideUp('fast', function () {
          var intervalId = loadingAnimation($loading);
          $.ajax({
            url: $link.attr('href'),
            success: function (content) {
              $loading.fadeOut('fast', function () {
                $(document).data('loading', false);
                clearInterval(intervalId);
                $content.html(content);
                var colorIndex = $(document).data('colorIndex');
                $content.find('.translucentFrame').addClass('containerColor' + colorIndex);
                $content.slideDown('fast');
              });
            }
          });
        });
      }
    });
  });

  function loadingAnimation($elem) {
    var count = 0;
    return setInterval(function () {
      $elem.text('Loading');
      for (var index = 0; index <= count; index++) {
        $elem.append('.');
      }
      count++;
      if (count >= 10) count = 0;
    }, 350);
  }

})(jQuery);