var granaDocs = (function($) {

  var currentSection, ignoreScrollEvent, $container;

  init = function() {

    $(function() {

      // init core stuff to get ui componenets working
      $.fieldText();

      // example related
      initSliderExamples();

      // document related
      hljs.initHighlightingOnLoad();

      $container = $('.doc-content');

      $('.doc-sandwich').on('click', toggleSideNav);

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

    toggleSideNavSubItems(link);
  };
  
  /**
   * Toggle the sidenav for mobile
   */
  toggleSideNav = function() {
    var $doc = $('.doc');
    var expandState = 'is-expanded';

    if ($doc.hasClass(expandState)) {
      $doc.removeClass(expandState);
    } else {
      $doc.addClass(expandState);
    }
  };

  toggleSideNavSubItems = function(link) {
    $('.sidenav-menu-items > li').removeClass('is-active');
    link.closest('.sidenav-menu-items > li').addClass('is-active');
  };

  /**
   * Initiate automatic scrolling to a section. If the id and link do
   * not exist, then we set the first section
   * @param  {string} hash Section hash bang
   */
  scrollToSection = function(hash) {
    ignoreScrollEvent = true;

    if ($(hash).length > 0 && $('a[href="' + hash + '"]').length > 0) {
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