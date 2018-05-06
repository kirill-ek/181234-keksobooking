'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    /* getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getAvatar: function (imgSrc, index, imgType) {
      var avatarImg = imgSrc + '0' + (index + 1) + '.' + imgType;
      if (index >= 10) {
        avatarImg = imgSrc + (index + 1) + '.' + imgType;
      }
      return avatarImg;
    },
    getRandomIndex: function (arr) {
      return arr[this.getRandomNumber(0, arr.length)];
    },

    getFeatures: function (arr) {
      var sliceBegin = this.getRandomNumber(0, arr.length);
      var sliceEnd = this.getRandomNumber(0, arr.length + 1);

      if (sliceBegin === sliceEnd) {
        sliceEnd++;
      } else if (sliceBegin > sliceEnd) {
        sliceEnd += sliceBegin;
      }

      return arr.slice(sliceBegin, sliceEnd);
    },
    */
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
