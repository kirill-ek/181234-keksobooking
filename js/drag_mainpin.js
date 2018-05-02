'use strict';

(function () {
  var mapPinMain = document.querySelector('.map').querySelector('.map__pin--main');

  var mapPinMainMousedownHandler = function (evt) {
    var mapPinMainStyle = getComputedStyle(mapPinMain);
    var mapPinMainHeight = parseInt(mapPinMainStyle.height, 10) / 2;
    var mapPinMainWidth = parseInt(mapPinMainStyle.width, 10);
    var address = document.querySelector('#address');

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var mapFiltersContainer = document.querySelector('.map').querySelector('.map__filters-container');
      var mapOverlay = document.querySelector('.map__overlay');
      var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeight);
      var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, 10));
      address.value = mapPinMainLeft + ', ' + mapPinMainTop;
      var TOP_BORDER = 0;
      var LEFT_BORDER = 0;
      var rightBorder = parseInt(getComputedStyle(mapOverlay).width, 10) - mapPinMainWidth;
      var bottomBorder = parseInt(getComputedStyle(mapOverlay).height, 10) -
        parseInt(getComputedStyle(mapFiltersContainer).height, 10);

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

      if (mapPinMainLeft <= LEFT_BORDER || mapPinMainLeft >= rightBorder ||
        (mapPinMainTop - mapPinMainHeight) <= TOP_BORDER || mapPinMainTop >= bottomBorder) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeight);
      var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, 10));
      address.value = mapPinMainLeft + ', ' + mapPinMainTop;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var mapPinMainTop = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeight);
    var mapPinMainLeft = Math.floor(parseInt(mapPinMain.style.left, 10));
    address.value = mapPinMainLeft + ', ' + mapPinMainTop;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
})();
