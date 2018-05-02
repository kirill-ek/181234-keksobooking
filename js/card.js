'use strict';

(function () {
  var AD_TYPE = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var adCard = mapCardTemplate.cloneNode(true);
  var adClose = adCard.querySelector('.popup__close');
  var fragment = document.createDocumentFragment();

  var closeCard = function () {
    adCard.classList.add('hidden');
  };

  var setFeatures = function (ad) {
    var popupFeaturesList = adCard.querySelector('.popup__features');
    var popupFeatures = popupFeaturesList.children;

    for (var i = 0; i < ad.offer.features.length; i++) {
      var featureClassName = 'popup__feature--' + ad.offer.features[i];
      if (!popupFeatures[i].classList.contains(featureClassName)) {
        popupFeatures[i].style.display = 'none';
      } else {
        popupFeatures[i].style.display = 'inline-block';
      }
    }
  };

  var setPhoto = function (ad) {
    var popupPhotos = adCard.querySelector('.popup__photos');
    var popupPhotosElem = adCard.querySelector('img.popup__photo');

    for (var i = 0; i < ad.offer.photos.length; i++) {
      var adCardPhoto = popupPhotosElem.cloneNode(true);
      adCardPhoto.src = ad.offer.photos[i];
      fragment.appendChild(adCardPhoto);
    }
    while (popupPhotos.querySelector('.popup__photo')) {
      adCardPhoto = popupPhotos.querySelector('.popup__photo');
      popupPhotos.removeChild(adCardPhoto);
    }
    popupPhotos.appendChild(fragment);
  };

  // создаем объявления
  var createAdCardElement = function (ad) {
    window.util.fillAdCardElement(adCard, '.popup__title', ad.offer.title);
    window.util.fillAdCardElement(adCard, '.popup__text--address', ad.offer.address);
    window.util.fillAdCardElement(adCard, '.popup__text--price', ad.offer.price + '₽/ночь');
    window.util.fillAdCardElement(adCard, '.popup__type', AD_TYPE[ad.offer.type]);
    window.util.fillAdCardElement(adCard, '.popup__text--capacity', ad.offer.rooms + ' комнаты для '
      + ad.offer.guests + ' гостей');
    window.util.fillAdCardElement(adCard, '.popup__text--time', 'Заезд после ' + ad.offer.checkin +
      ', выезд до ' + ad.offer.checkout);
    window.util.fillAdCardElement(adCard, '.popup__description', ad.offer.description);
    adCard.querySelector('.popup__avatar').src = ad.author.avatar;

    adCard.classList.remove('hidden');
    setPhoto(ad);
    setFeatures(ad);
    window.util.elementHandler(adClose, closeCard, true);

    return adCard;
  };

  window.cardCreateAdCardElement = createAdCardElement;
})();
