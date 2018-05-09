'use strict';

(function () {
  var HALF = 1 / 2;

  var Border = {
    TOP: 150,
    LEFT: 0,
    BOTTOM: 500
  };

  var mapPinMain = window.util.elements.map.querySelector('.map__pin--main');

  var mapPinMainMousedownHandler = function (evt) {
    var mapPinMainStyle = getComputedStyle(mapPinMain);
    var mapPinMainHeight = parseInt(mapPinMainStyle.height, window.util.DEC);
    var mapPinMainWidth = parseInt(mapPinMainStyle.width, window.util.DEC) * HALF;
    var address = document.querySelector('#address');

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mapPinMainMousemoveHandler = function (moveEvt) {
      var mapOverlay = document.querySelector('.map__overlay');
      var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, window.util.DEC));
      var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, window.util.DEC));
      var rightBorder = parseInt(getComputedStyle(mapOverlay).width, window.util.DEC) - mapPinMainWidth;

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

      if (mapPinMainTop <= Border.TOP) {
        mapPinMain.style.top = Border.TOP + mapPinMainHeight + 'px';
      } else if (mapPinMainTop >= Border.BOTTOM) {
        mapPinMain.style.top = (Border.BOTTOM - mapPinMainHeight) + 'px';
      }

      if (mapPinMainLeft <= Border.LEFT) {
        mapPinMain.style.left = Border.LEFT + mapPinMainWidth + 'px';
      } else if (mapPinMainLeft >= rightBorder) {
        mapPinMain.style.left = (rightBorder - mapPinMainWidth) + 'px';
      }
    };

    var mapPinMainMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, window.util.DEC) + mapPinMainHeight);
      var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, window.util.DEC));
      address.value = mapPinMainLeft + ', ' + mapPinMainTop;

      document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
      document.removeEventListener('mouseup', mapPinMainMouseupHandler);
    };

    var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, window.util.DEC) + mapPinMainHeight);
    var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, window.util.DEC));
    address.value = mapPinMainLeft + ', ' + mapPinMainTop;

    document.addEventListener('mousemove', mapPinMainMousemoveHandler);
    document.addEventListener('mouseup', mapPinMainMouseupHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
})();
