(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define([ 'jquery' ], factory);
  } else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
  }
}(function($) {

  function stepper(el, options) {
    var defaults = {};

    this.options = $.extend({}, defaults, options);
    this.$el = el;


    this.init();
  }

  stepper.prototype = {

    init: function() {
      var context = this;
    },


  };

  /**
   *
   * Basic UI behaviour. Apply functionality based on defined class names.
   **/

  $.fn.stepper = function(options) {
    return new stepper(this, options);
  };

}));
