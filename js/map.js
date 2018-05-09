'use strict';

(function () {
  var mapPinMain = window.util.elements.map.querySelector('.map__pin--main');
  var adCards = [];

  var activateFields = function () {
    var adFormFields = window.util.elements.adForm.querySelectorAll('fieldset');
    var filterFormFields = window.util.elements.map.querySelectorAll('.map__filter');
    var mapCheckboxes = window.util.elements.map.querySelectorAll('.map__checkbox');

    window.util.enableFormFields(adFormFields);
    window.util.enableFormFields(filterFormFields);
    window.util.enableFormFields(mapCheckboxes);

    window.util.elements.adForm.classList.remove('ad-form--disabled');
    window.util.elements.map.classList.remove('map--faded');
  };

  var loadHandler = function (data) {
    var mapFiltersContainer = window.util.elements.map.querySelector('.map__filters-container');
    adCards = data;

    var adCard = window.card.createAdCardElement(adCards[0]);
    adCard.classList.add('hidden');

    window.pin.createPins(data);

    window.util.elements.map.insertBefore(adCard, mapFiltersContainer);

    window.map = {
      receivedAdCards: data
    };
  };

  var errorHandler = function (errorMessage) {
    window.error.createErrorMessage(errorMessage);
  };

  var activateMap = function () {
    window.backend.load(loadHandler, errorHandler);
  };

  var mapPinMainMouseupHandler = function () {
    if (document.querySelector('.map--faded')) {
      activateMap();
      activateFields();
    }
    document.removeEventListener('mouseup', mapPinMainMouseupHandler);
  };

  mapPinMain.addEventListener('mousedown', function () {
    document.addEventListener('mouseup', mapPinMainMouseupHandler);
  });
})();
