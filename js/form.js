'use strict';

(function () {
  var TIME_OUT = 2000;
  var SELECT_TIME_DEFAULT = '12:00';

  var SelectValue = {
    DEFAULT: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adFormReset = window.util.elements.adForm.querySelector('.ad-form__reset');
  var inputPrice = window.util.elements.adForm.querySelector('#price');
  var selectType = window.util.elements.adForm.querySelector('#type');
  var selectTimeIn = window.util.elements.adForm.querySelector('#timein');
  var selectTimeOut = window.util.elements.adForm.querySelector('#timeout');
  var selectRooms = window.util.elements.adForm.querySelector('#room_number');
  var selectCapacity = window.util.elements.adForm.querySelector('#capacity');

  var checkRooms = function () {
    if (selectRooms.value === SelectValue.DEFAULT && selectCapacity.value !== SelectValue.DEFAULT) {
      selectCapacity.setCustomValidity('Максимальная вместимость - не более 1 человека');
    } else if (selectRooms.value === SelectValue.TWO && (selectCapacity.value !== SelectValue.DEFAULT
        && selectCapacity.value !== SelectValue.TWO)) {
      selectCapacity.setCustomValidity('Максимальная вместимость - не более 2-х человек');
    } else if (selectRooms.value === SelectValue.THREE && (selectCapacity.value !== SelectValue.DEFAULT
        && selectCapacity.value !== SelectValue.TWO && selectCapacity.value !== SelectValue.THREE)) {
      selectCapacity.setCustomValidity('Максимальная вместимость - не более 3-х человек');
    } else if (selectRooms.value === SelectValue.HUNDRED && selectCapacity.value !== window.util.NULL_VALUE) {
      selectCapacity.setCustomValidity('100 комнат - не для гостей');
    } else {
      selectCapacity.setCustomValidity('');
    }
  };

  var checkType = function () {
    switch (selectType.value) {
      case 'bungalo':
        inputPrice.min = MinPrice.BUNGALO;
        inputPrice.placeholder = MinPrice.BUNGALO;
        break;
      case 'flat':
        inputPrice.min = MinPrice.FLAT;
        inputPrice.placeholder = MinPrice.FLAT;
        break;
      case 'house':
        inputPrice.min = MinPrice.HOUSE;
        inputPrice.placeholder = MinPrice.HOUSE;
        break;
      case 'palace':
        inputPrice.min = MinPrice.PALACE;
        inputPrice.placeholder = MinPrice.PALACE;
        break;
    }
  };

  var checkTime = function () {
    selectTimeIn.addEventListener('change', function () {
      selectTimeOut.value = selectTimeIn.value;
    });

    selectTimeOut.addEventListener('change', function () {
      selectTimeIn.value = selectTimeOut.value;
    });
  };

  var setDefaultSettings = function () {
    var inputTitle = window.util.elements.adForm.querySelector('#title');
    var inputDescription = window.util.elements.adForm.querySelector('#description');
    var photos = window.photo.previewPhotoContainer.querySelectorAll('img');

    inputTitle.value = '';
    inputDescription.value = '';
    selectRooms.value = SelectValue.DEFAULT;
    selectCapacity.value = SelectValue.DEFAULT;
    selectType.value = 'flat';
    inputPrice.value = MinPrice.FLAT;
    selectTimeIn.value = SELECT_TIME_DEFAULT;
    selectTimeOut.value = SELECT_TIME_DEFAULT;
    window.photo.previewAvatar.src = 'img/muffin-grey.svg';

    photos.forEach(function (photo) {
      photo.remove();
    });

    window.default.desactivateMap();
    window.default.desactivateFields();
  };

  var selectChangeHandler = function () {
    selectRooms.addEventListener('change', checkRooms);
    selectCapacity.addEventListener('change', checkRooms);
    selectType.addEventListener('change', checkType);
    checkTime();
  };

  var loadHandler = function () {
    var successMessage = document.querySelector('.success');

    successMessage.classList.remove('hidden');

    setTimeout(function () {
      successMessage.classList.add('hidden');
    }, TIME_OUT);

    setDefaultSettings();
  };

  var errorHandler = function (errorMessage) {
    window.error.createErrorMessage(errorMessage);
  };

  window.util.elements.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(window.util.elements.adForm);
    window.backend.save(data, loadHandler, errorHandler);
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    setDefaultSettings();
  });

  selectChangeHandler();
})();
