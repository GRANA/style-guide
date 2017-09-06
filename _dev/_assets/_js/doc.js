var granaDocs = (function($) {

  init = function() {

    $(function() {
      $.fieldText();
      hljs.initHighlightingOnLoad();
    });
  };

  return {
  	init: init,
  };
})(jQuery);

granaDocs.init();