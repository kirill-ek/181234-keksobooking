'use strict';

(function () {
  var TIME_OUT = 500;

  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var mapFilters = window.util.elements.map.querySelector('.map__filters');
  var housingType = window.util.elements.map.querySelector('#housing-type');
  var housingPrice = window.util.elements.map.querySelector('#housing-price');
  var housingRooms = window.util.elements.map.querySelector('#housing-rooms');
  var housingGuests = window.util.elements.map.querySelector('#housing-guests');
  var mapCheckboxes = window.util.elements.map.querySelectorAll('.map__checkbox');

  var filterType = function (typeValue, ad) {
    if (typeValue === 'any') {
      return true;
    }

    if (isNaN(parseInt(typeValue, window.util.DEC))) {
      return ad === typeValue;
    }

    return ad === parseInt(typeValue, window.util.DEC);
  };

  var filterHouseRooms = function (ad) {
    return filterType(housingRooms.value, ad.offer.rooms);
  };

  var filterHouseGuests = function (ad) {
    return filterType(housingGuests.value, ad.offer.guests);
  };

  var filterHouseType = function (ad) {
    return filterType(housingType.value, ad.offer.type);
  };

  var filterHousePrice = function (ad) {
    switch (housingPrice.value) {
      case 'low':
        return ad.offer.price <= Price.LOW;
      case 'middle':
        return ad.offer.price >= Price.LOW && ad.offer.price <= Price.MIDDLE;
      case 'high':
        return ad.offer.price >= Price.MIDDLE;
      default:
        return true;
    }
  };

  var filterFeatures = function (ad) {
    for (var i = 0; i < mapCheckboxes.length; i++) {
      if (mapCheckboxes[i].checked && ad.offer.features.indexOf(mapCheckboxes[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var mapFiltersChangeHandler = function () {
    var timer = null;

    var updatePins = function () {
      var similarAds = window.map.receivedAdCards.slice();
      var filteredAds = similarAds.filter(filterHouseType)
          .filter(filterHousePrice)
          .filter(filterHouseRooms)
          .filter(filterHouseGuests)
          .filter(filterFeatures);

      window.default.desactivatePins();
      window.pin.createPins(filteredAds);
    };

    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(updatePins, TIME_OUT);
  };

  var defaultFilters = function () {
    housingType.selectedIndex = window.util.NULL_VALUE;
    housingPrice.selectedIndex = window.util.NULL_VALUE;
    housingRooms.selectedIndex = window.util.NULL_VALUE;
    housingGuests.selectedIndex = window.util.NULL_VALUE;
    window.util.disableCheckbox(mapCheckboxes);
  };

  mapFilters.addEventListener('change', mapFiltersChangeHandler);

  window.filter = {
    defaultFilters: defaultFilters
  };
})();
