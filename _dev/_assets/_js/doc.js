var granaDocs = (function($) {

  init = function() {

    $(function() {
      $.fieldText();
      hljs.initHighlightingOnLoad();
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