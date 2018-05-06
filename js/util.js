'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    fillAdCardElement: function (elem, className, content) {
      var adCardContent = elem.querySelector(className);
      adCardContent.textContent = content;
      return adCardContent;
    },

    elementHandler: function (element, action, docEsc) {
      var elementClickHandler = function (evt) {
        action(evt);
      };

      var elementKeydownHandler = function (evt) {
        if (evt.keyCode === Keycode.ENTER) {
          action(evt);
        }
      };

      if (docEsc) {
        var documentKeydownHandler = function (evt) {
          if (evt.keyCode === Keycode.ESC) {
            evt.preventDefault();
            action();
          }
        };
        document.addEventListener('keydown', documentKeydownHandler);
      }

      element.addEventListener('click', elementClickHandler);
      element.addEventListener('keydown', elementKeydownHandler);
    }
  };
})();
