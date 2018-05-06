'use strict';

(function () {
  var createErrorMessage = function (errorMessage) {
    var message = document.createElement('div');
    var TIME_OUT = 3000;

    message.style =
      'z-index: 100; ' +
      'margin: 0 auto; ' +
      'padding: 20px; ' +
      'text-align: center; ' +
      'background-color: rgba(255, 0, 0, 0.8); ' +
      'color: white';
    message.style.position = 'absolute';
    message.style.left = '0';
    message.style.right = '0';
    message.style.top = '20%';
    message.style.fontSize = '30px';
    message.textContent = errorMessage;

    setTimeout(function () {
      message.classList.add('hidden');
    }, TIME_OUT);

    document.body.insertAdjacentElement('afterbegin', message);
  };

  window.createErrorMessage = createErrorMessage;
})();
