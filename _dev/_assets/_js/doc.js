var granaDocs = (function($) {

  init = function() {

    $(function() {
      $.fieldText();
      hljs.initHighlightingOnLoad();

      $('a.sidenav-menu-link').on('click', clickSideNavLink);
    });

    $(window).load(function() {
      $('.doc-content').scrollTop($(window.location.hash).position().top);
    });

  };

  clickSideNavLink = function() {
  	$('a.sidenav-menu-link').removeClass('is-selected');
    $(this).addClass('is-selected');
  };

  return {
    init: init,
  };
})(jQuery);

granaDocs.init();