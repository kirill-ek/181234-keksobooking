'use strict';

(function () {
  var mapPinMain = document.querySelector('.map').querySelector('.map__pin--main');
  var DEC = 10;

  var mapPinMainMousedownHandler = function (evt) {
    var mapPinMainStyle = getComputedStyle(mapPinMain);
    var mapPinMainHeight = parseInt(mapPinMainStyle.height, DEC) / 2;
    var mapPinMainWidth = parseInt(mapPinMainStyle.width, DEC);
    var address = document.querySelector('#address');

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mapPinMainMousemoveHandler = function (moveEvt) {
      var mapOverlay = document.querySelector('.map__overlay');
      var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, DEC) + mapPinMainHeight);
      var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, DEC));

      var TOP_BORDER = 150;
      var LEFT_BORDER = 0;
      var BOTTOM_BORDER = 500;
      var rightBorder = parseInt(getComputedStyle(mapOverlay).width, DEC) - mapPinMainWidth;

      address.value = mapPinMainLeft + ', ' + mapPinMainTop;
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if ((mapPinMainTop - mapPinMainHeight) <= TOP_BORDER) {
        mapPinMain.style.top = (TOP_BORDER + mapPinMainHeight) + 'px';
      } else if (mapPinMainTop >= BOTTOM_BORDER) {
        mapPinMain.style.top = BOTTOM_BORDER - mapPinMainHeight + 'px';
      }

      if (mapPinMainLeft <= LEFT_BORDER) {
        mapPinMain.style.left = LEFT_BORDER + mapPinMainWidth / 2 + 'px';
      } else if (mapPinMainLeft >= rightBorder) {
        mapPinMain.style.left = rightBorder - mapPinMainWidth / 2 + 'px';
      }
    };

    var mapPinMainMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, DEC) + mapPinMainHeight);
      var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, DEC));
      address.value = mapPinMainLeft + ', ' + mapPinMainTop;

      document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
      document.removeEventListener('mouseup', mapPinMainMouseupHandler);
    };

    var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, DEC) + mapPinMainHeight);
    var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, DEC));
    address.value = mapPinMainLeft + ', ' + mapPinMainTop;

    document.addEventListener('mousemove', mapPinMainMousemoveHandler);
    document.addEventListener('mouseup', mapPinMainMouseupHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
})();
