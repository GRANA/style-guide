var granaDocs = (function($) {

  init = function() {

    $(function() {
      $.fieldText();
      hljs.initHighlightingOnLoad();

      $('a.sidenav-menu-link').on('click', function(e) {

        $('a.sidenav-menu-link').removeClass('is-selected');

        $(this).addClass('is-selected');

      });
    });

    $(window).load(function() {
      $('.doc-content').scrollTop($(window.location.hash).position().top);
    });

  };

  return {
    init: init,
  };
})(jQuery);

granaDocs.init();