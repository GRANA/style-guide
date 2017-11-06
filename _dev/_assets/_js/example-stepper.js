var exampleStepper = (function($) {

  init = function() {

    $(function() {
      $('#stepper-example').stepper();
    });

  };

  return {
    init: init,
  };
})(jQuery);

exampleStepper.init();