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
