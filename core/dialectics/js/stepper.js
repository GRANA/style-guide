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

    this.$numInput = this.$el.find('.stepper-numeric');
    this.$upButton = this.$el.find('.stepper-up');
    this.$downButton = this.$el.find('.stepper-down');

    this.min = this.$numInput.attr('min');
    this.max = this.$numInput.attr('max');

    this.init();
  }

  stepper.prototype = {

    init: function() {
      var context = this;

      this.$upButton.on('click', this.increaseValue.bind(this));
      this.$downButton.on('click', this.decreaseValue.bind(this));

    },

    increaseValue: function() {
      var curValue = this.$numInput.val();
      var newValue = parseInt(curValue) + 1;

      if (newValue <= this.max) {
        this.$numInput.val(newValue);
        this.$numInput.trigger('change');
      }

    },

    decreaseValue: function() {
      var curValue = this.$numInput.val();
      var newValue = parseInt(curValue) - 1;

      if (newValue >= this.min) {
        this.$numInput.val(newValue);
        this.$numInput.trigger('change');
      }

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
