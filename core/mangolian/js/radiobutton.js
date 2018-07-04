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
      inputSelector: '.radiobutton',
      inputDeselector: '.radiobutton-deselect',
    };

    this.options = $.extend({}, defaults, options);
    this.input = this.options.inputSelector;
    this.inputDeselect = this.options.inputDeselector;

    this.init();
  }

  radiobutton.prototype = {

    init: function() {
      var context = this;

      $(document)
        .on('click',this.inputDeselect + ' + label', function(e) {
          e.preventDefault();
        });

      $(document)
        .on('mousedown',this.inputDeselect + ' + label',
          function() {
            var $input = $(this).siblings(context.input);

            if ($input.prop('checked')) {
              $input.prop('checked', false).trigger('change');
            } else {
              $input.prop('checked', true).trigger('change');
            }
          });
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
