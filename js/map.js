'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adCards = [];

  var activateFields = function () {
    var fields = document.querySelectorAll('fieldset');

    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }

    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  };

  var loadHandler = function (data) {
    var mapFiltersContainer = map.querySelector('.map__filters-container');
    adCards = data;

    var adCard = window.cardCreateAdCardElement(adCards[0]);
    adCard.classList.add('hidden');

    window.pinCreatePins(data);

    map.insertBefore(adCard, mapFiltersContainer);

    window.map = {
      adCardsArr: data
    };
  };

  var errorHandler = function (errorMessage) {
    window.createErrorMessage(errorMessage);
  };

  var activateMap = function () {
    window.backend.load(loadHandler, errorHandler);
  };

  var mainPinMouseupHandler = function (evt) {
    evt.preventDefault();

    activateMap();
    activateFields();

    mapPinMain.removeEventListener('mouseup', mainPinMouseupHandler);
  };

  mapPinMain.addEventListener('mouseup', mainPinMouseupHandler);

  window.mapMainPinMouseUpHandler = mainPinMouseupHandler;
})();

