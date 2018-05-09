'use strict';

(function () {
  var createErrorMessage = function (errorMessage) {
    var TIME_OUT = 3000;
    var COLOR_RED = 'rgba(255, 0, 0, 0.8)';

    var StyleValue = {
      Z_INDEX: 100,
      PADDING_VALUE: 20,
      TOP: 20,
      FONT_SIZE: 30
    };

    var message = document.createElement('div');

    message.style =
      'z-index: ' + StyleValue.Z_INDEX +
      'margin: ' + window.util.NULL_VALUE + ' auto; ' +
      'padding: ' + StyleValue.PADDING_VALUE + 'px; ' +
      'text-align: center; ' +
      'background-color: ' + COLOR_RED +
      'color: white';
    message.style.position = 'absolute';
    message.style.left = '' + window.util.NULL_VALUE;
    message.style.right = '' + window.util.NULL_VALUE;
    message.style.top = StyleValue.TOP + '%';
    message.style.fontSize = StyleValue.FONT_SIZE + 'px';
    message.textContent = errorMessage;

    setTimeout(function () {
      message.classList.add('hidden');
    }, TIME_OUT);

    document.body.insertAdjacentElement('afterbegin', message);
  };

  window.error = {
    createErrorMessage: createErrorMessage
  };
})();
