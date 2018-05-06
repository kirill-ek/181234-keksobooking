'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var housingType = map.querySelector('#housing-type');
  var housingPrice = map.querySelector('#housing-price');
  var housingRooms = map.querySelector('#housing-rooms');
  var housingGuests = map.querySelector('#housing-guests');
  var mapCheckbox = map.querySelectorAll('.map__checkbox');

  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var filterType = function (typeValue, ad) {
    if (typeValue === 'any') {
      return ad;
    }

    if (isNaN(parseInt(typeValue, 10))) {
      return ad === typeValue;
    } else {
      return ad === parseInt(typeValue, 10);
    }
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
        return ad;
    }
  };

  var filterFeatures = function (ad) {
    for (var i = 0; i < mapCheckbox.length; i++) {
      if (mapCheckbox[i].checked && ad.offer.features.indexOf(mapCheckbox[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var mapFiltersChangeHandler = function () {
    var TIME_OUT = 500;
    var timer = null;

    var updatePins = function () {
      var similarAds = window.map.adCardsArr.slice();
      var filteredAds = similarAds.filter(filterHouseType)
          .filter(filterHousePrice)
          .filter(filterHouseRooms)
          .filter(filterHouseGuests)
          .filter(filterFeatures);

      window.default.desactivatePins();
      window.pinCreatePins(filteredAds);
    };

    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(updatePins, TIME_OUT);
  };

  var defaultFilters = function () {
    housingType.selectedIndex = 0;
    housingPrice.selectedIndex = 0;
    housingRooms.selectedIndex = 0;
    housingGuests.selectedIndex = 0;
    mapCheckbox.forEach(function (feature) {
      feature.checked = false;
    });
  };

  mapFilters.addEventListener('change', mapFiltersChangeHandler);

  window.filter = {
    defaultFilters: defaultFilters
  };
})();
