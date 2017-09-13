(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define([ 'jquery' ], factory);
  } else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
  }
}(function($) {


  /**
   * fieldText plugin constructor
   **/
  function fieldText(options) {
    var defaults = {
      inputSelector: '.field-text',
      wrapperSelector: '.field-group',
    };

    this.options = $.extend({}, defaults, options);

    this.input = this.options.inputSelector;
    this.wrapper = this.options.wrapperSelector;

    this.init();
  }

  fieldText.prototype = {

    init: function() {

      var context = this;

      // set the focus and blur events to animate the label
      $(document)
        .on('focus', this.input,
          function() {
            context.onFocus(this);
          })
        .on('blur', this.input, function() {
          context.onBlur(this);
        });

      // events to determine if the input is empty, if it is add or remove
      // the class
      $(document).on('keyup change paste', this.input, function() {
        context.checkEmpty(this);
      });

    },

    checkEmpty: function(el) {
      var $el = $(el);
      var fieldValue = $el.val();
      var $fieldGroup = $el.closest(this.wrapper);

      if (!fieldValue) {
        $fieldGroup.removeClass('is-filled');
      } else {
        $fieldGroup.addClass('is-filled');
      }
    },

    onFocus: function(el) {
      $(el).closest(this.wrapper).addClass('is-focus');
    },

    onBlur: function(el) {
      $(el).closest(this.wrapper).removeClass('is-focus');
    },
  };


  /**
   *
   * Basic UI behaviour. Apply functionality based on defined class names.
   **/

  $.extend({
    fieldText: function(options) {
      new fieldText(options);
    },
  });

}));
