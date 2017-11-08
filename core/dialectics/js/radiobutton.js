(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define([ 'jquery' ], factory);
  } else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
  }
}(function($) {

  function radiobutton(el, options) {
    var defaults = {
      inputSelector: '.radiobutton'
    };

    this.options = $.extend({}, defaults, options);
    this.input = this.options.inputSelector;

    this.init();
  }

  radiobutton.prototype = {

    init: function() {
      var context = this;

    },

  };

  /**
   *
   * Basic UI behaviour. Apply functionality based on defined class names.
   **/

  $.extend({
    radiobutton: function(options) {
      new radiobutton(options);
    },
  });

}));
