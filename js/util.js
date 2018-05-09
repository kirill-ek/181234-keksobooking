'use strict';

(function () {
  var DEC = 10;
  var NULL_VALUE = 0;

  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    DEC: DEC,
    NULL_VALUE: NULL_VALUE,

    elements: {
      map: document.querySelector('.map'),
      adForm: document.querySelector('.ad-form'),
      mapPins: document.querySelector('.map__pins')
    },

    fillAdCardElement: function (elem, className, content) {
      var adCardContent = elem.querySelector(className);
      adCardContent.textContent = content;
      return adCardContent;
    },

    shuffleArray: function (ads) {
      for (var i = ads.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var num = ads[i];

        ads[i] = ads[j];
        ads[j] = num;
      }
      return ads;
    },

    disableCheckbox: function (checkboxes) {
      checkboxes.forEach(function (element) {
        element.checked = false;
      });
    },

    disableFormFields: function (formFields) {
      formFields.forEach(function (field) {
        field.setAttribute('disabled', 'disabled');
      });
    },

    enableFormFields: function (formFields) {
      formFields.forEach(function (field) {
        field.removeAttribute('disabled', 'disabled');
      });
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
          document.removeEventListener('keydown', documentKeydownHandler);
        };
        document.addEventListener('keydown', documentKeydownHandler);
      }

      element.addEventListener('click', elementClickHandler);
      element.addEventListener('keydown', elementKeydownHandler);
    }
  };
})();
