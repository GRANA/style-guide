var exampleTextarea = (function($) {

  init = function() {

    $(function() {
      initTextareaExamples();
    });

  };

  /**
   * Initialize Textarea examples
   */
  initTextareaExamples = function() {
    ReactDOM.render(
      React.createElement(FieldText, {name: 'textarea-example', type: 'textarea', label: 'message'}, null),
      document.getElementById('example-figure-textarea')
    );
  };

  return {
    init: init,
  };
})(jQuery);

exampleTextarea.init();