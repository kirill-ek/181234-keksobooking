'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var activateFields = function () {
    var fields = document.querySelectorAll('fieldset');

    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }

    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  };

  var activateMap = function () {
    var mapFiltersContainer = map.querySelector('.map__filters-container');
    var adCards = [];

    var onLoad = function (data) {
      adCards = data;

      window.pinCreatePins(adCards);
      map.insertBefore(window.cardCreateAdCardElement(adCards[0]), mapFiltersContainer);
    };
    window.backend.load(onLoad);
  };

  var mainPinMouseupHandler = function (evt) {
    evt.preventDefault();

    activateMap();
    activateFields();

    mapPinMain.removeEventListener('mouseup', mainPinMouseupHandler);
  };

  mapPinMain.addEventListener('mouseup', mainPinMouseupHandler);
})();

