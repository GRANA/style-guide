var granaDocs = (function($) {

  var currentSection, ignoreScrollEvent, $container;

  init = function() {

    $(function() {

      // init core stuff to get ui componenets working
      $.fieldText();

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

      // document related 
      // 
      hljs.initHighlightingOnLoad();

      $container = $('.doc-content');

      $('a.sidenav-menu-link').on('click', function() {
        selectSideNavLink($(this));
      });

      $(window).on('popstate', function() {
        scrollToSection(window.location.hash);
      });

      $('.doc-content').scroll(function() {
        var ignore = ignoreScrollEvent;
        ignoreScrollEvent = false;

        if (ignore) {
          return false;
        }

        scrollOnSection();
      });

    });

    $(window).load(function() {
      scrollToSection(window.location.hash);
    });

  };

  /**
   * Displays side menu nav link as active
   * @param  {object} link jQuery object of link element to be selected
   */
  selectSideNavLink = function(link) {
    $('a.sidenav-menu-link').removeClass('is-selected');
    link.addClass('is-selected');
  };

  /**
   * Initiate automatic scrolling to a section. If the id and link do
   * not exist, then we set the first section
   * @param  {string} hash Section hash bang
   */
  scrollToSection = function(hash) {
    ignoreScrollEvent = true;

    if ($(hash).length > 0 && $('a[href="' + hash + '"').length > 0) {
      selectSideNavLink($('a[href="' + hash + '"'));
      $container.scrollTop($(hash).position().top);
      currentSection = hash;

    } else {
      setDefault();
    }
  };

  /**
   * Executes on scroll and determines if the position is on 
   * a new section
   */
  scrollOnSection = function() {
    var hash;
    var currentSectionStart = $(currentSection).position().top;
    var currentSectionEnd = currentSectionStart + $(currentSection).outerHeight();
    var currentScrollPos = $container.scrollTop();

    if (currentScrollPos < currentSectionStart) {
      var prevHash = '#' + $(currentSection).prev().attr('id');
      hash = prevHash;
    } else if (currentScrollPos > currentSectionEnd) {
      var nextHash = '#' + $(currentSection).next().attr('id');
      hash = nextHash;
    }

    if (currentScrollPos < currentSectionStart || currentScrollPos > currentSectionEnd) {
      currentSection = hash;
      selectSideNavLink($('a[href="' + hash + '"'));
      history.pushState(null,null,hash);
    }

  };

  /**
   * Sets the current section to the first section of the
   * document
   */
  setDefault = function() {
    $container.scrollTop(0);
    hash = '#' + $('.doc-section:first-child').attr('id');
    selectSideNavLink($('a[href="' + hash + '"'));
    history.pushState(null,null,hash);
    currentSection = hash;
  };

  return {
    init: init,
  };
})(jQuery);

granaDocs.init();