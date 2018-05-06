'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var RequestStatus = {
    OK: 200,
    TIMEOUT: 10000
  };

  var getXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = RequestStatus.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === RequestStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Извините, произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка: запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var loadXhr = getXhr(onLoad, onError);

    loadXhr.open('GET', Url.LOAD);
    loadXhr.send();
  };

  var save = function (data, onLoad, onError) {
    var saveXhr = getXhr(onLoad, onError);

    saveXhr.open('POST', Url.UPLOAD);
    saveXhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
