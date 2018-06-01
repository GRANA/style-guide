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
      React.createElement(FieldText, {name: 'standard-textfield-example', label: 'label'}, null),
      document.getElementById('example-figure-standard-textfield')
    );
  };

  return {
    init: init,
  };
})(jQuery);

exampleTextfield.init();