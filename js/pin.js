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

    var openPinElement = function (evt) {
      var target = evt.currentTarget;
      var index = target.dataset.index;

      window.cardCreateAdCardElement(ad[index]);
    };

    window.util.elementHandler(pinElement, openPinElement);
    setPinStyle(pinElement, ad, i);

    return pinElement;
  };

  // функция, которая создает пины на карте
  var createPins = function (ad) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');

    for (var i = 0; i < ad.length; i++) {
      fragment.appendChild(createPinElement(ad[i], i));
    }
    mapPins.appendChild(fragment);
  };

  window.pinCreatePins = createPins;
  window.pinCreatePinElement = createPinElement;
})();
