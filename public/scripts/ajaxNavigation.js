(function ($) {
  $(function () {
    $(document).on('click', 'a.hijax', function (e) {
      e.preventDefault();
      if (!$(document).data('loading')) {
        $(document).data('loading', true);
        var $link = $(this);
        var $content = $('#content');
        $content.slideUp('fast', function () {
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
            .fadeIn('fast', function () {
              var intervalId = loadingAnimation($loading);
              $.ajax({
                url: $link.attr('href'),
                success: function (content) {
                  $loading.fadeOut('fast', function () {
                    clearInterval(intervalId);
                    $content.html(content).slideDown('fast');
                    var colorIndex = $(document).data('colorIndex');
                    $content.find('.translucentFrame').addClass('containerColor' + colorIndex);
                    $(document).data('loading', false);
                  });
                }
              });
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