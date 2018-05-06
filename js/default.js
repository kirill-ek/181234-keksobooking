'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var DEC = 10;

  var desactivatePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.querySelectorAll('button');
    var mapCard = document.querySelector('.map__card');

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].hasAttribute('data-index')) {
        mapPins.removeChild(buttons[i]);
      }
    }

    if (mapCard) {
      mapCard.classList.add('hidden');
    }
  };

  var desactivateFields = function () {
    var fields = document.querySelectorAll('fieldset');
    var address = document.querySelector('#address');
    var mapPinMainStyle = getComputedStyle(mapPinMain);

    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }

    address.value = Math.floor(parseInt(mapPinMainStyle.left, DEC)) + ', ' +
      Math.floor(parseInt(mapPinMainStyle.top, DEC));
  };

  var desactivateMap = function () {
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
    mapPinMain.addEventListener('mouseup', window.mapMainPinMouseUpHandler);

    desactivatePins();
    window.filter.defaultFilters();
  };

  desactivateMap();
  desactivateFields();

  window.default = {
    desactivatePins: desactivatePins,
    desactivateMap: desactivateMap,
    desactivateFields: desactivateFields
  };
})();


