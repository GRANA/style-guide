var exampleSlider = (function($) {

  init = function() {

    $(function() {
      initSliderExamples();
    });

  };

  /**
   * Initialize slider examples
   */
  initSliderExamples = function() {

    $('#slider-example').slider({
      min: 0,
      max: 100,
      step: 5,
      values: [ 20 ],
      slide: function(event,ui) {
        $(this).find('.ui-slider-range-cur').html('$' + ui.values[0]);
      },
    });
    $('#slider-example').find('.ui-slider-range-cur').html('$' + $('#slider-example').slider('values',0));

    $('#slider-range-example').slider({
      range: true,
      min: 0,
      max: 100,
      step: 5,
      values: [ 20, 50 ],
      slide: function(event,ui) {
        $(this).find('.ui-slider-range-min').html('$' + ui.values[0]);
        $(this).find('.ui-slider-range-max').html('$' + ui.values[1]);
      },
    });
    $('#slider-range-example').find('.ui-slider-range-min').html('$' + $('#slider-range-example').slider('values',0));
    $('#slider-range-example').find('.ui-slider-range-max').html('$' + $('#slider-range-example').slider('values',1));
  };

  return {
    init: init,
  };
})(jQuery);

exampleSlider.init();