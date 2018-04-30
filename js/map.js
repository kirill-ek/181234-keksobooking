'use strict';

(function () {
  var map = document.querySelector('.map');
  var template = document.querySelector('template');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainStyle = getComputedStyle(mapPinMain);
  var mapPinTemplate = template.content.querySelector('.map__pin');
  var ENTER_KEYCODE = 13;

  // отключение активных полей
  var desactivateActiveFields = function () {
    var fields = document.querySelectorAll('fieldset');
    var address = document.querySelector('#address');
    var mapPinMainHeight = parseInt(mapPinMainStyle.height, 10);
    document.querySelector('article.map__card');

    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }

    address.setAttribute('disabled', 'disabled');
    address.value = Math.floor(parseInt(mapPinMainStyle.left, 10)) + ', ' +
      Math.floor(parseInt(mapPinMainStyle.top, 10) + mapPinMainHeight / 2);

    map.classList.remove('map--faded');

    if (document.querySelector('article.map__card')) {
      document.querySelector('article.map__card').classList.add('hidden');
    }
  };

  // создаем метки
  var createPinElement = function (ad, i) {
    var MAP_PIN_WIDTH = 50;
    var MAP_PIN_HEIGHT = 70;
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = ad.location.x + MAP_PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y + MAP_PIN_HEIGHT + 'px';
    pinElement.setAttribute('data-index', i);

    var pinAvatar = pinElement.querySelector('img');
    pinAvatar.src = ad.author.avatar;
    pinAvatar.alt = ad.offer.title;

    var openPinElement = function (evt) {
      var adCards = window.dataCreateAdList();
      var target = evt.currentTarget;
      var index = target.dataset.index;

      window.cardCreateAdCardElement(adCards[index]);
    };

    var pinElementClickHandler = function (evt) {
      openPinElement(evt);
    };

    var pinElementKeydownHandler = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPinElement(evt);
      }
    };

    pinElement.addEventListener('click', pinElementClickHandler);
    pinElement.addEventListener('keydown', pinElementKeydownHandler);

    return pinElement;
  };

  desactivateActiveFields();

  window.mapDesactivateActiveFields = desactivateActiveFields;
  window.mapCreatePinElement = createPinElement;
})();

