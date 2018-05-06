'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('#type');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

  var checkRooms = function () {
    if (selectRooms.value === '1' && selectCapacity.value !== '1') {
      selectCapacity.setCustomValidity('Максимальная вместимость - не более 1 человека');
    } else if (selectRooms.value === '2' && (selectCapacity.value !== '1' && selectCapacity.value !== '2')) {
      selectCapacity.setCustomValidity('Максимальная вместимость - не более 2-х человек');
    } else if (selectRooms.value === '3'
      && (selectCapacity.value !== '1' && selectCapacity.value !== '2' && selectCapacity.value !== '3')) {
      selectCapacity.setCustomValidity('Максимальная вместимость - не более 3-х человек');
    } else if (selectRooms.value === '100' && selectCapacity.value !== '0') {
      selectCapacity.setCustomValidity('100 комнат - не для гостей');
    } else {
      selectCapacity.setCustomValidity('');
    }
  };

  var checkType = function () {
    var MIN_PRICE_BUNGALO = 0;
    var MIN_PRICE_FLAT = 1000;
    var MIN_PRICE_HOUSE = 5000;
    var MIN_PRICE_PALACE = 10000;

    switch (selectType.value) {
      case 'bungalo':
        inputPrice.min = MIN_PRICE_BUNGALO;
        inputPrice.placeholder = MIN_PRICE_BUNGALO;
        break;
      case 'flat':
        inputPrice.min = MIN_PRICE_HOUSE;
        inputPrice.placeholder = MIN_PRICE_HOUSE;
        break;
      case 'house':
        inputPrice.min = MIN_PRICE_FLAT;
        inputPrice.placeholder = MIN_PRICE_FLAT;
        break;
      case 'palace':
        inputPrice.min = MIN_PRICE_PALACE;
        inputPrice.placeholder = MIN_PRICE_PALACE;
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
    var inputTitle = adForm.querySelector('#title');
    var inputDescription = adForm.querySelector('#description');
    var preview = document.querySelector('.ad-form-header__preview img');

    inputTitle.value = '';
    inputDescription.value = '';
    selectRooms.value = '1';
    selectCapacity.value = '1';
    selectType.value = 'flat';
    inputPrice.value = '1000';
    selectTimeIn.value = '12:00';
    selectTimeOut.value = '12:00';
    preview.src = 'img/muffin-grey.svg';

    window.default.desactivateMap();
    window.default.desactivateFields();
  };

  var selectChangeHandler = function () {
    selectRooms.addEventListener('change', checkRooms);
    selectCapacity.addEventListener('change', checkRooms);
    selectType.addEventListener('change', checkType);
    selectTimeIn.addEventListener('change', checkTime);
    selectTimeOut.addEventListener('change', checkTime);
  };

  var loadHandler = function () {
    var successMessage = document.querySelector('.success');
    var TIME_OUT = 2000;

    successMessage.classList.remove('hidden');

    setTimeout(function () {
      successMessage.classList.add('hidden');
    }, TIME_OUT);

    setDefaultSettings();
  };

  var errorHandler = function (errorMessage) {
    window.createErrorMessage(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(adForm);
    window.backend.save(data, loadHandler, errorHandler);
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    setDefaultSettings();
  });
  selectChangeHandler();
})();
