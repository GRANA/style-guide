var exampleDropdown = (function($) {

  init = function() {

    $(function() {
      initDropdownExamples();
    });

  };

  /**
   * Initialize dropdown examples
   */
  initDropdownExamples = function() {

    $('#dropdown-example').fieldDropdown({
      inputName: 'dropdownExample',
      defaultItem: 'BH',
      onselect: function(el) {
        var isoCode = $(el).data('field-value');
      },
    });

    $('#dropdown-invert-example').fieldDropdown({
      inputName: 'dropdownInvertExample',
      defaultItem: 'BH',
      onselect: function(el) {
        var isoCode = $(el).data('field-value');
      },
    });

  };

  return {
    init: init,
  };
})(jQuery);

exampleDropdown.init();