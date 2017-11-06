var exampleStepper = (function($) {

  init = function() {

    $(function() {
      $('#stepper-example').stepper();
      $('#stepper-example-blue').stepper();
      $('#stepper-example-outline').stepper();
    });

  };

  return {
    init: init,
  };
})(jQuery);

exampleStepper.init();