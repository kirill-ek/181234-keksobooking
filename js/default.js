'use strict';

(function () {
  window.desactivateMap = function () {
    var fields = document.querySelectorAll('fieldset');
    var address = document.querySelector('#address');
    var mapPinMain = document.querySelector('.map__pin--main');
    var mapPinMainStyle = getComputedStyle(mapPinMain);
    var mapPinMainHeight = parseInt(mapPinMainStyle.height, 10);
    var mapCard = document.querySelector('article.map__card');

    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }

    address.setAttribute('disabled', 'disabled');
    address.value = Math.floor(parseInt(mapPinMainStyle.left, 10)) + ', ' +
      Math.floor(parseInt(mapPinMainStyle.top, 10) + mapPinMainHeight / 2);

    if (mapCard) {
      mapCard.classList.add('hidden');
    }
  };

  window.desactivateMap();
})();


