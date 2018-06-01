var exampleTextfield = (function($) {

  init = function() {

    $(function() {
      initTextfieldExamples();
    });

  };

  /**
   * Initialize Textfield examples
   */
  initTextfieldExamples = function() {
    ReactDOM.render(
      React.createElement(FieldText, {name: 'standard-textfield-example', label: 'label', helper: 'field helper text'}, null),
      document.getElementById('example-figure-standard-textfield')
    );
  };

  return {
    init: init,
  };
})(jQuery);

exampleTextfield.init();