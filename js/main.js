'use strict';

const dataPhotos = [];
const names = ['Олег', 'Миша', 'Саша', 'Петр', 'Оля', 'Маша', 'Катя', 'Аня'];
const comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const photosCount = 25;
const getRandomNum = function (minValue, maxValue) {
  const randomNum = Math.floor(Math.random() * maxValue);
  return randomNum > minValue ? randomNum : minValue;
};
const commentsData = [
  {
    avatar: "img/avatar-6.svg",
    message: "В целом всё неплохо. Но не всё.",
    name: "Артем"
  },
  {
    avatar: "img/avatar-2.svg",
    message: "В целом всё неплохо. Но не всё.",
    name: "Артем"
  }
];

const getPhotoObj = function (i) {
  const photoObject = {
    url: 'photos/' + i + '.jpg',
    description: 'описание фотографии',
    likes: getRandomNum(15, 200),
    comments: commentsData
  }

  return photoObject;
};

const genereteData = function () {
  for (let i = 1; i <= photosCount; i++) {
    dataPhotos.push(getPhotoObj(i))
  };
};

const getPhoto = function (photoObj) {
  const pictureTemplate = document.querySelector('#picture')
    .content
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoObj.url;
  photoElement.querySelector('.picture__likes').textContent = photoObj.likes;
  photoElement.querySelector('.picture__comments').textContent = photoObj.comments.length;

  return photoElement;
}

const renderUserPhotos = function (data) {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(getPhoto(data[i]));
  }
  pictures.appendChild(fragment);
};

genereteData();
renderUserPhotos(dataPhotos);

//------------------------------------------------------------------------------//
const bigPhoto = document.querySelector('.big-picture');
// bigPhoto.classList.remove('hidden');
const getComment = function (obj) {
  return `<li class="social__comment">
    <img class="social__picture" src="${obj.avatar}" alt="${obj.name}" width="35" height="35">
    <p class="social__text">${obj.message}</p>
  </li>`
};

const renderBigPhoto = function (photoObj) {
  bigPhoto.querySelector('.big-picture__img img').src = photoObj.url;
  bigPhoto.querySelector('.likes-count').textContent = photoObj.likes;
  bigPhoto.querySelector('.comments-count').textContent = photoObj.comments.length;
  bigPhoto.querySelector('.social__caption').textContent = photoObj.description;
  const commentsHtml = photoObj.comments.map(function (comment) {
    let commentMap = getComment(comment);
    return commentMap;
  });

  bigPhoto.querySelector('.social__comments').innerHTML = commentsHtml.join('');
};

const hideElements = function () {
  bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
  bigPhoto.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
}

renderBigPhoto(dataPhotos[0]);
hideElements();

// -----------------------Загрузка изображения и показ формы редактирования-----
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

// --------показ формы редактирования--------

const openImgUploadOverlay = function (evt) {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

imgUploadInput.addEventListener('click', function () {
  openImgUploadOverlay();
});

imgUploadInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openImgUploadOverlay();
  }
});

// --------закрытие формы редактирования--------

const closeImgUploadOverlay = function (evt) {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
}

imgUploadButton.addEventListener('click', function () {
  closeImgUploadOverlay();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    closeImgUploadOverlay();
  }
});

// ------------------валидация--------------------
var HASHTAGS_MAX_COUNT = 5;
var HASHTAG_REG_EXP = /^#([а-я]|[А-Я]|[a-zA-Z]|[0-9]){1,20}$/;

var USER_MESSAGE = {
  LESS_THEN_FIVE: 'Нельзя указать больше пяти хэш-тегов',
  NO_DUPLICATES: 'один и тот же хэш-тег не может быть использован дважды',
  CORRECT: 'Не верный формат'
};

var inputHashtags = document.querySelector('.text__hashtags');
