'use strict';

(function () {
  var MainPinPosition = {
    LEFT: 570,
    TOP: 375
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  var desactivatePins = function () {
    var mapCard = window.util.elements.map.querySelector('.map__card');
    var buttons = window.util.elements.mapPins.querySelectorAll('button');

    buttons.forEach(function (button) {
      if (button.hasAttribute('data-index')) {
        window.util.elements.mapPins.removeChild(button);
      }
    });

    if (mapCard) {
      mapCard.classList.add('hidden');
    }
  };

  var desactivateFields = function () {
    var featureCheckboxes = window.util.elements.adForm.querySelectorAll('.feature__checkbox');
    var adFormFields = window.util.elements.adForm.querySelectorAll('fieldset');
    var address = window.util.elements.adForm.querySelector('#address');
    var filterFormFields = document.querySelectorAll('.map__filter');
    var mapCheckboxes = document.querySelectorAll('.map__checkbox');
    var mapPinMainStyle = getComputedStyle(mapPinMain);

    address.value = Math.floor(parseInt(mapPinMainStyle.left, window.util.DEC)) + ', ' +
      Math.floor(parseInt(mapPinMainStyle.top, window.util.DEC));

    window.util.elements.adForm.classList.add('ad-form--disabled');

    window.util.disableFormFields(adFormFields);
    window.util.disableFormFields(filterFormFields);
    window.util.disableFormFields(mapCheckboxes);
    window.util.disableCheckbox(featureCheckboxes);
  };

  var desactivateMap = function () {
    mapPinMain.style.left = MainPinPosition.LEFT + 'px';
    mapPinMain.style.top = MainPinPosition.TOP + 'px';

    window.util.elements.map.classList.add('map--faded');

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


