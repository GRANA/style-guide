var exampleCheckbox = (function($) {

  init = function() {

    $(function() {
      initCheckboxExamples();
    });

  };

  /**
   * Initialize checkbox examples
   */
  initCheckboxExamples = function() {

    var el = React.createElement('div', {className: 'commentBox'},
      React.createElement(Checkbox, {name: 'checkbox-example', isChecked: true}, null),
      React.createElement(Checkbox, {name: 'checkbox2-example', isChecked: true}, null)
    );
    ReactDOM.render(
      el,
      document.getElementById('example-figure-checkbox')
    );

  };

  return {
    init: init,
  };
})(jQuery);

exampleCheckbox.init();