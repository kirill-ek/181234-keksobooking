'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZE = 70;
  var MARGIN_SIZE = 5;
  var PHOTO_CONTAINER_SIZE = '50%';

  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserPhoto = document.querySelector('#images');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewPhotoContainer = document.querySelector('.ad-form__photo');
  previewPhotoContainer.style.width = PHOTO_CONTAINER_SIZE;
  previewPhotoContainer.setAttribute('dropzone', 'move');

  var createImages = function (parentElem) {
    var img = document.createElement('img');
    img.style.width = PHOTO_SIZE + 'px';
    img.style.height = PHOTO_SIZE + 'px';
    img.style.margin = MARGIN_SIZE + 'px';
    img.setAttribute('draggable', 'true');
    parentElem.appendChild(img);

    return img;
  };

  var chooseFile = function (fileChooser, manyFiles, img) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (manyFiles) {
            img = createImages(previewPhotoContainer);
          }

          img.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  chooseFile(fileChooserAvatar, false, previewAvatar);
  chooseFile(fileChooserPhoto, true);

  window.photo = {
    previewAvatar: previewAvatar,
    previewPhotoContainer: previewPhotoContainer
  };
})();
