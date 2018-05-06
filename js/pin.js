'use strict';

(function () {
  var setPinStyle = function (pin, ad, i) {
    var MAP_PIN_WIDTH = 50;
    var MAP_PIN_HEIGHT = 70;

    pin.style.left = ad.location.x + MAP_PIN_WIDTH / 2 + 'px';
    pin.style.top = ad.location.y + MAP_PIN_HEIGHT + 'px';
    pin.setAttribute('data-index', i);

    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = ad.author.avatar;
    pinAvatar.alt = ad.offer.title;
  };

  var createPinElement = function (ad, i) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var pinElement = mapPinTemplate.cloneNode(true);

    window.util.elementHandler(pinElement, function () {
      window.cardCreateAdCardElement(ad);
    });
    setPinStyle(pinElement, ad, i);

    return pinElement;
  };

  var shuffleArray = function (adArr) {
    for (var i = adArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var num = adArr[i];

      adArr[i] = adArr[j];
      adArr[j] = num;
    }
    return adArr;
  };

  // функция, которая создает пины на карте
  var createPins = function (ad) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');
    var AD_COUNT = 5;
    var adToShow = ad.slice();

    if (adToShow.length > AD_COUNT) {
      shuffleArray(adToShow);
      adToShow.splice(5);
    }

    for (var i = 0; i < adToShow.length; i++) {
      fragment.appendChild(createPinElement(ad[i], i));
    }

    mapPins.appendChild(fragment);
  };

  window.pinCreatePins = createPins;
  window.pinCreatePinElement = createPinElement;
})();
