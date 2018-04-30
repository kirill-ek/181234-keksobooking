'use strict';

(function () {
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
  var AD_LIST_LENGTH = 8;

  var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  // создание перечня объявлений
  var createAdList = function () {
    var adList = [];

    // создание объектов - карточек объявлений
    for (var i = 0; i < AD_LIST_LENGTH; i++) {
      // нахождение местоположения
      var coordinates = {
        x: window.util.getRandomNumber(MIN_WIDTH, MAX_WIDTH),
        y: window.util.getRandomNumber(MIN_HEIGHT, MAX_HEIGHT)
      };

      var adListItem =
        {
          author: {
            avatar: window.util.getAvatar('img/avatars/user', i, 'png'),
          },
          offer: {
            title: AD_TITLE[i],
            address: coordinates.x + ', ' + coordinates.y,
            price: window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
            type: window.util.getRandomIndex(AD_TYPE),
            rooms: window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
            guests: window.util.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
            checkin: window.util.getRandomIndex(CHECK_TIME),
            checkout: window.util.getRandomIndex(CHECK_TIME),
            features: window.util.getFeatures(FEATURES),
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

  window.dataCreateAdList = createAdList;
})();
