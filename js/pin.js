'use strict';

(function () {
  var AD_COUNT = 5;
  var MAP_PIN_HALF_WIDTH = 25;
  var MAP_PIN_HEIGHT = 70;

  var setPinStyle = function (pin, ad, i) {
    var pinAvatar = pin.querySelector('img');

    pin.style.left = ad.location.x + MAP_PIN_HALF_WIDTH + 'px';
    pin.style.top = ad.location.y + MAP_PIN_HEIGHT + 'px';
    pin.setAttribute('data-index', i);

    pinAvatar.src = ad.author.avatar;
    pinAvatar.alt = ad.offer.title;
  };

  var createPinElement = function (ad, i) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var pinElement = mapPinTemplate.cloneNode(true);

    window.util.elementHandler(pinElement, function () {
      window.card.createAdCardElement(ad);
    });
    setPinStyle(pinElement, ad, i);

    return pinElement;
  };

  // функция, которая создает пины на карте
  var createPins = function (ads) {
    var fragment = document.createDocumentFragment();
    var adsToShow = ads.slice();

    if (adsToShow.length > AD_COUNT) {
      window.util.shuffleArray(adsToShow);
      adsToShow.splice(AD_COUNT);
    }

    for (var i = 0; i < adsToShow.length; i++) {
      fragment.appendChild(createPinElement(ads[i], i));
    }

    window.util.elements.mapPins.appendChild(fragment);
  };

  window.pin = {
    createPins: createPins
  };
})();
