'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var AD_TYPE_TRANSLATE = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  var template = document.querySelector('template');
  var mapCardTemplate = template.content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();
  var adCard = mapCardTemplate.cloneNode(true);

  // создаем объявления
  var createAdCardElement = function (ad) {
    var popupFeaturesList = adCard.querySelector('.popup__features');
    var popupFeatures = popupFeaturesList.children;
    var popupPhotos = adCard.querySelector('.popup__photos');
    var popupPhotosElem = adCard.querySelector('img.popup__photo');
    var adClose = adCard.querySelector('.popup__close');

    var closeCard = function () {
      adCard.classList.add('hidden');
    };

    var buttonCloseClickHandler = function () {
      closeCard();
    };

    var buttonCloseKeydownHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
        closeCard();
      }
    };

    var documentKeydownHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    };

    window.util.fillAdCardElement(adCard, '.popup__title', ad.offer.title);
    window.util.fillAdCardElement(adCard, '.popup__text--address', ad.offer.address);
    window.util.fillAdCardElement(adCard, '.popup__text--price', ad.offer.price + '₽/ночь');
    window.util.fillAdCardElement(adCard, '.popup__type', AD_TYPE_TRANSLATE[ad.offer.type]);
    window.util.fillAdCardElement(adCard, '.popup__text--capacity', ad.offer.rooms + ' комнаты для '
      + ad.offer.guests + ' гостей');
    window.util.fillAdCardElement(adCard, '.popup__text--time', 'Заезд после ' + ad.offer.checkin +
      ', выезд до ' + ad.offer.checkout);
    window.util.fillAdCardElement(adCard, '.popup__description', ad.offer.description);
    adCard.querySelector('.popup__avatar').src = ad.author.avatar;

    // определение удобств в объявлении
    for (var i = 0; i < ad.offer.features.length; i++) {
      var featureClassName = 'popup__feature--' + ad.offer.features[i];
      if (!popupFeatures[i].classList.contains(featureClassName)) {
        popupFeatures[i].style.display = 'none';
      } else {
        popupFeatures[i].style.display = 'inline-block';
      }
    }

    // отображение фотографий
    for (var j = 0; j < ad.offer.photos.length; j++) {
      var adCardPhoto = popupPhotosElem.cloneNode(true);
      adCardPhoto.src = ad.offer.photos[j];
      fragment.appendChild(adCardPhoto);
    }
    while (popupPhotos.querySelector('.popup__photo')) {
      adCardPhoto = popupPhotos.querySelector('.popup__photo');
      popupPhotos.removeChild(adCardPhoto);
    }
    popupPhotos.appendChild(fragment);

    adCard.classList.remove('hidden');
    adClose.addEventListener('click', buttonCloseClickHandler);
    adClose.addEventListener('keydown', buttonCloseKeydownHandler);
    document.addEventListener('keydown', documentKeydownHandler);

    return adCard;
  };

  window.cardCreateAdCardElement = createAdCardElement;
})();
