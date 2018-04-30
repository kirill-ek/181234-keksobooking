'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
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
    fillAdCardElement: function (elem, className, content) {
      var adCardContent = elem.querySelector(className);
      adCardContent.textContent = content;
      return adCardContent;
    }
  };
})();
