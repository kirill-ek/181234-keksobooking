'use strict';

var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_WIDTH = 300;
var MAX_WIDTH = 900;
var MIN_HEIGHT = 150;
var MAX_HEIGHT = 500;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var AD_LIST_LENGTH = 8;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var AD_TYPE_TRANSLATE = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var template = document.querySelector('template');
var mapPinTemplate = template.content.querySelector('.map__pin');
var mapCardTemplate = template.content.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var adCard = mapCardTemplate.cloneNode(true);
var mapPinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var fields = document.querySelectorAll('fieldset');
var mapPinMainStyle = getComputedStyle(mapPinMain);

// функции
// случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// создание аватара
var getAvatar = function (imgSrc, index, imgType) {
  var avatarImg = imgSrc + '0' + (index + 1) + '.' + imgType;
  if (index >= 10) {
    avatarImg = imgSrc + (index + 1) + '.' + imgType;
  }
  return avatarImg;
};

// выбор случайного значения из массива
var getRandomIndex = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

// создание массива с набором удобств
var getFeatures = function (arr) {
  var sliceBegin = getRandomNumber(0, arr.length);
  var sliceEnd = getRandomNumber(0, arr.length + 1);

  if (sliceBegin === sliceEnd) {
    sliceEnd++;
  } else if (sliceBegin > sliceEnd) {
    sliceEnd += sliceBegin;
  }

  return arr.slice(sliceBegin, sliceEnd);
};

// создание перечня объявлений
var createAdList = function () {
  var adList = [];

  // создание объектов - карточек объявлений
  for (var i = 0; i < AD_LIST_LENGTH; i++) {
    // нахождение местоположения
    var coordinates = {x: getRandomNumber(MIN_WIDTH, MAX_WIDTH), y: getRandomNumber(MIN_HEIGHT, MAX_HEIGHT)};
    var adListItem =
      {
        author: {
          avatar: getAvatar('img/avatars/user', i, 'png'),
        },
        offer: {
          title: AD_TITLE[i],
          address: coordinates.x + ', ' + coordinates.y,
          price: getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: getRandomIndex(AD_TYPE),
          rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          checkin: getRandomIndex(CHECK_TIME),
          checkout: getRandomIndex(CHECK_TIME),
          features: getFeatures(FEATURES),
          description: '',
          photos: PHOTOS
        },
        location: {
          x: coordinates.x,
          y: coordinates.y
        }
      };
    adList.push(adListItem);
  }

  return adList;
};

var adCards = createAdList();

// создаем метки
var createPinElement = function (ad, i) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + MAP_PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y + MAP_PIN_HEIGHT + 'px';
  pinElement.setAttribute('data-index', i);

  var pinAvatar = pinElement.querySelector('img');
  pinAvatar.src = ad.author.avatar;
  pinAvatar.alt = ad.offer.title;

  var openPinElement = function (evt) {
    var target = evt.currentTarget;
    var index = target.dataset.index;
    createAdCardElement(adCards[index]);
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

var createPins = function () {
  for (var i = 0; i < adCards.length; i++) {
    fragment.appendChild(createPinElement(adCards[i], i));
  }
  mapPins.appendChild(fragment);
};

// создаем объявления
var createAdCardElement = function (ad) {
  var popupFeaturesList = adCard.querySelector('.popup__features');
  var popupFeatures = popupFeaturesList.children;
  var popupPhotos = adCard.querySelector('.popup__photos');
  var popupPhotosElem = adCard.querySelector('img.popup__photo');
  var adClose = adCard.querySelector('.popup__close');

  var fillAdCardElement = function (className, content) {
    var adCardContent = adCard.querySelector(className);
    adCardContent.textContent = content;
    return adCardContent;
  };

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

  var windowKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  fillAdCardElement('.popup__title', ad.offer.title);
  fillAdCardElement('.popup__text--address', ad.offer.address);
  fillAdCardElement('.popup__text--price', ad.offer.price + '₽/ночь');
  fillAdCardElement('.popup__type', AD_TYPE_TRANSLATE[ad.offer.type]);
  fillAdCardElement('.popup__text--capacity', ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
  fillAdCardElement('.popup__text--time', 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
  fillAdCardElement('.popup__description', ad.offer.description);
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
  window.addEventListener('keydown', windowKeydownHandler);

  return adCard;
};

// отключение активных полей
var desactivateActiveFields = function () {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }

  address.setAttribute('disabled', 'disabled');
  address.value = parseInt(mapPinMainStyle.left, 10) + ', ' + parseInt(mapPinMainStyle.top, 10);

  map.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form__disabled');
};

var activateMapPinMain = function () {
  var mapPinMainHeight = parseInt(mapPinMainStyle.height, 10);
  var mapPinMainCoordX = parseInt(mapPinMainStyle.left, 10);
  var mapPinMainCoordY = parseInt(mapPinMainStyle.top, 10) + mapPinMainHeight / 2;

  for (var j = 0; j < fields.length; j++) {
    fields[j].removeAttribute('disabled');
  }

  address.value = mapPinMainCoordX + ', ' + mapPinMainCoordY;
  createPins(adCards);

  map.insertBefore(createAdCardElement(adCards[0]), map.querySelector('.map__filters-container'));
  adCard.classList.add('hidden');
};

var mapPinMainMouseupHandler = function () {
  activateMapPinMain();
};

desactivateActiveFields();
mapPinMain.addEventListener('mouseup', mapPinMainMouseupHandler);
