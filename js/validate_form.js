'use strict';

var adForm = document.querySelector('.ad-form');
var adFormSubmit = adForm.querySelector('.ad-form__submit');
var adFormReset = adForm.querySelector('.ad-form__reset');
var inputPrice = adForm.querySelector('#price');
var selectType = adForm.querySelector('#type');
var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');
var selectRooms = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');
var adInputs = adForm.querySelectorAll('input[type="text"], input[type="number"]');
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var fields = document.querySelectorAll('fieldset');
var mapPinMainStyle = getComputedStyle(mapPinMain);

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

  if (selectType.value === 'bungalo') {
    inputPrice.min = MIN_PRICE_BUNGALO;
    inputPrice.placeholder = MIN_PRICE_BUNGALO;
  } else if (selectType.value === 'flat') {
    inputPrice.min = MIN_PRICE_FLAT;
    inputPrice.placeholder = MIN_PRICE_FLAT;
  } else if (selectType.value === 'house') {
    inputPrice.min = MIN_PRICE_HOUSE;
    inputPrice.placeholder = MIN_PRICE_HOUSE;
  } else if (selectType.value === 'palace') {
    inputPrice.min = MIN_PRICE_PALACE;
    inputPrice.placeholder = MIN_PRICE_PALACE;
  }
};

var checkTime = function () {
  selectTimeIn.addEventListener('change', function (evt) {
    selectTimeOut.value = evt.target.value;
  });

  selectTimeOut.addEventListener('change', function (evt) {
    selectTimeIn.value = evt.target.value;
  });
};

var desactivateActiveFields = function () {
  var inputTitle = adForm.querySelector('#title');
  var inputDescription = adForm.querySelector('#description');

  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }

  address.setAttribute('disabled', 'disabled');
  address.value = parseInt(mapPinMainStyle.left, 10) + ', ' + parseInt(mapPinMainStyle.top, 10);

  map.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form__disabled');
  var buttons = document.querySelectorAll('button');

  for (var j = 0; j < buttons.length; j++) {
    if (buttons[j].hasAttribute('data-index')) {
      buttons[j].setAttribute('hidden', 'hidden');
    }
  }

  inputTitle.value = '';
  inputDescription.value = '';
  selectRooms.value = '1';
  selectCapacity.value = '1';
  selectType.value = 'flat';
  inputPrice.value = '1000';
  selectTimeIn.value = '12:00';
  selectTimeOut.value = '12:00';
};

selectRooms.addEventListener('change', checkRooms);
selectCapacity.addEventListener('change', checkRooms);
selectType.addEventListener('change', checkType);
selectTimeIn.addEventListener('change', checkTime);
selectTimeOut.addEventListener('change', checkTime);

adFormSubmit.addEventListener('click', function () {
  for (var i = 0; i < adInputs.length; i++) {
    if (!adInputs[i].validity.valid) {
      adInputs[i].classList.add('invalid');
    }
  }
});

adFormReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  desactivateActiveFields();
});
