(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define([ 'jquery' ], factory);
  } else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
  }
}(function($) {

  function fieldDropdown(el, options) {
    var defaults = {
      inputSelector: '.field-dropdown',
      wrapperSelector: '.field-group',
      inputValueAttr: 'field-value',
      defaultItem: false,
      inputName: null,
      onselect: function() {},
    };

    this.options = $.extend({}, defaults, options);

    this.$el = el;

    this.input = this.options.inputSelector;
    this.wrapper = this.options.wrapperSelector;
    this.inputValAttr = this.options.inputValueAttr;
    this.defaultItem = this.options.defaultItem;
    this.isFocused = false;
    this.listItemsSelector = this.input + '-item');

    this.$inputHidden =
    this.$el.find('input[name="' + this.options.inputName + '"]');
    this.$label = this.$el.find(this.input + '-label');
    this.$scrollListContainer = this.$el.find(this.input + '-list-container');
    this.$scrollList = this.$scrollListContainer.find(this.input + '-list');

    this.init();
  }

  fieldDropdown.prototype = {

    /**
     * Initial setup of events
     */
    init: function() {

      var context = this;


      this.selectDefault(this.defaultItem);


      // Handlers
      $(document).on('click', this.toggleAwayClick.bind(this));

      this.$el.on('click', this.toggleList.bind(this));

      this.$el.on('click', this.listItemsSelector, function() {
        context.selectItem(this);
      });

      $(document).on('keypress', this.$el, this.onKeypress.bind(this));

    },

    /**
     * Click away function to close dropdown
     *
     * @param  {Object} click event
     */
    toggleAwayClick: function(e) {
      if (!$(e.target).closest(this.$el).length &&
          this.$el.hasClass('is-open')) {
        this.closeList();
      }
    },

    /**
     * Toggle the dropdown
     */
    toggleList: function() {

      if (this.$el.hasClass('is-open')) {
        this.closeList();
      } else {
        this.openList();
      }

    },

    /**
     * Open the dropdown
     */
    openList: function() {
      this.$el.addClass('is-open');
      this.setFocus();
      this.setItemPositionOnOpen();
    },

    /**
     * Close the dropdown
     */
    closeList: function() {
      this.$el.removeClass('is-open');
      this.removeFocus();
    },

    selectDefault: function(defaultVal) {

      var selected = false;

      if (defaultVal) {
        selected = this.selectItemByValue(defaultVal);
      }

      if (!selected) {
        var $selected = this.$scrollList.find('.is-selected');

        if ($selected.length > 0) {
          this.switchLabel($selected.html());
          this.setHiddenInput($selected[0]);

        } else {
          var $firstItem = this.$listItems.first();
          this.selectItem($firstItem[0]);
        }
      }


    },

    /**
     * Takes the supplied item value and selects it.
     *
     * @param  {String} val Value of the item
     * @return {Boolean} True or false depending on if the value exists
     */
    selectItemByValue: function(val) {
      var $targetEl = this.$el.find(
        this.input + '-item[data-' + this.inputValAttr + '="' + val + '"]');

      if ($targetEl.length > 0) {
        this.selectItem($targetEl[0]);
        return true;
      }

      return false;
    },

    /**
     * Selects dropdown menu item
     *
     * @param  {Object} Dropdown menu item element
     */
    selectItem: function(el) {

      var $selected = $(el);

      if (!$selected.hasClass('is-selected') &&
          !$selected.hasClass('is-disabled')) {
        var label = $(el).html();


        this.removeItemFocus();
        // switch the label
        this.swapSelected(el);
        this.switchLabel(label);
        this.setHiddenInput(el);

        // check if there is a callback that needs to be executed
        if (this.options.onselect &&
            typeof this.options.onselect == 'function') {
          this.options.onselect(el);
        }
      }

    },

    /**
     * Set the item as selected whilst removing the selected
     * state of previous item.
     *
     * @param  {Object} Dropdown menu item
     */
    swapSelected: function(el) {
      var $selected = this.$el.find('.is-selected');
      $selected.removeClass('is-selected');

      $(el).addClass('is-selected');

    },

    /**
     * Update the label element.
     *
     * @param  {String} Label of the selected item
     */
    switchLabel: function(label) {
      this.$label.html(label);
    },

    /**
     * Update dropdown hidden input value.
     *
     * @param {Object} Dropdown menu item
     */
    setHiddenInput: function(el) {
      var value = $(el).data(this.inputValAttr);
      this.$inputHidden.val(value);
    },

    /**
     * Determine the focused item based on provided character.
     *
     * @param  {String} Character to be searched
     */
    getNextItem: function(key) {

      var context = this;

      // if an item with the char is currently selected, check the next index.
      var existKey = this.isKeyFocused(key);
      if (existKey > -1) {
        var $itemEl = this.$listItems.eq(existKey);
        var $nextItem = this.$listItems.eq(existKey + 1);

        if ($nextItem.length > 0) {
          var letter = this.getItemFirstLetter($nextItem);

          if (letter === key && !$itemEl.hasClass('is-disabled')) {
            this.setItemPosition($nextItem[0]);
            this.removeItemFocus();
            $nextItem.addClass('is-focused');
          }
        }
      } else {
        // key isnt already focused, let's find it.
        this.$listItems.each(function(i) {
          var $itemEl = $(this);
          var letter = context.getItemFirstLetter($itemEl);

          if (letter === key && !$itemEl.hasClass('is-disabled')) {
            context.setItemPosition($itemEl[0]);
            context.removeItemFocus();
            $itemEl.addClass('is-focused');
            return false;
          }

        });
      }

    },

    /**
     * Check if the supplied key is already focused.
     *
     * @param  {String} Character to be searched
     * @return {Number} Index of focused item that matches the character
     */
    isKeyFocused: function(key) {
      var context = this;
      var $itemEl = this.$el.find('.is-focused');

      if ($itemEl.length > 0) {
        var itemName = $itemEl.html();
        var firstCharOfItemName = this.getFirstLetter(itemName);

        if (firstCharOfItemName === key) {
          return $itemEl.index();
        }
      }

      return -1;
    },

    /**
     * Set scroll position of the list container so that the
     * focused item is visible.
     *
     * @param {Object} Dropdown menu item element.
     */
    setItemPosition: function(el) {
      var $itemEl = $(el);
      var topPos = this.$scrollList.find($itemEl).position().top;
      this.$scrollListContainer.scrollTop(topPos);
    },

    /**
     * Checks the currently selected item, and sets the scroll position
     * to that item.
     */
    setItemPositionOnOpen: function() {

      var $selected = this.$el.find('.is-selected');
      if ($selected.length > 0) {
        this.setItemPosition($selected[0]);
      }

    },

    /**
     * Get the first letter of the supplied string.
     *
     * @param  {String} Item label name
     * @return {String} Lowercase character
     */
    getFirstLetter: function(string) {
      return string.charAt(0).toLowerCase();
    },

    /**
     * Get the first letter of the supplied element
     *
     * @param  {Object} jQuery object of item
     * @return {String}
     */
    getItemFirstLetter: function(item) {
      var itemName = item.html();
      return this.getFirstLetter(itemName);
    },

    /**
     * Fire on keypress, determining char.
     *
     * @param  {Object} Click event
     */
    onKeypress: function(e) {
      if (this.isFocused) {
        var char = e.key;
        this.getNextItem(char);
      }
    },

    /**
     * Sets the dropdown to the focused state. While in the focused state
     * we detect the keypresses.
     *
     * For now we will only have focus when the dropdown is open,
     * however native select behaviour maintains focus on the
     * first click away.
     */
    setFocus: function() {
      this.isFocused = true;
    },

    removeFocus: function() {
      this.isFocused = false;
    },

    /**
     * Find and remove is-focused state on dropdown's items
     */
    removeItemFocus: function() {
      this.$el.find('.is-focused').removeClass('is-focused');
    },

  };

  function fieldMobileDropdown(el, options) {
    var defaults = {defaultItem: false, onselect: function() {}};

    this.options = $.extend({}, defaults, options);

    this.defaultItem = this.options.defaultItem;

    this.$el = el;
    this.$select = this.$el.find('.field-dropdown-select');
    this.$label = this.$el.find('.field-dropdown-label');


    this.init();
  }

  fieldMobileDropdown.prototype = {

    init: function() {

      var context = this;
      this.selectDefault(this.defaultItem);

      $('body').on('change', this.$select, function() {
        var $selected = context.$el.find(':selected');
        context.selectItem($selected);
      });
    },


    selectDefault: function(defaultVal) {

      var selected = false;

      if (defaultVal) {
        selected = this.selectItemByValue(defaultVal);
      }

      if (!selected) {
        var $selected = this.$el.find(':selected');

        if ($selected.length > 0) {
          this.selectItem($selected);
        } else {
          var $firstItem = this.$el.find('option').first();
          this.selectItem($firstItem);
        }
      }


    },

    /**
     * Takes the supplied item value and selects it.
     *
     * @param  {String} val Value of the item
     * @return {Boolean} True or false depending on if the value exists
     */
    selectItemByValue: function(val) {
      var $targetEl = this.$el.find('option[value="' + val + '"]');

      if ($targetEl.length > 0) {
        this.selectItem($targetEl);
        return true;
      }

      return false;
    },

    selectItem: function(el) {
      var $selected = el;
      $selected.prop('selected', true);
      this.updateLabel($selected.html());

      // check if there is a callback that needs to be executed
      if (this.options.onselect && typeof this.options.onselect == 'function') {
        this.options.onselect(el);
      }
    },

    updateLabel: function(string) {
      this.$label.html(string);
    },

  };


  /**
   *
   * Basic UI behaviour. Apply functionality based on defined class names.
   **/

  $.fn.fieldDropdown = function(options) {
    return new fieldDropdown(this, options);
  };

  $.fn.fieldMobileDropdown = function(options) {
    return new fieldMobileDropdown(this, options);
  };


}));
