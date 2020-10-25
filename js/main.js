var NAME = ['Олег', 'Миша', 'Саша', 'Петр', 'Оля', 'Маша', 'Катя', 'Аня'];
var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getUrl = function () {
  var arrX = [];
  for (var i = 1; i <= 25; i++) {
    arrX.push(i);
  }
  var arrUrl = [];
  for (var i = 0; i < 25; i++) {
    var url = 'photos/' + arrX[i] + '.jpg';
    arrUrl.push(url);
  }

  return arrUrl;
};

var getLikes = function () {
  var arrLikes = [];
  for (var i = 15; i <= 200; i++) {
    arrLikes.push(i);
  }
  var rendomLike = arrLikes[Math.floor(Math.random() * arrLikes.length)];

  return rendomLike;
};

var getAvatar = function () {
  var arrX = [];
  for (var i = 1; i <= 6; i++) {
    arrX.push(i);
  }
  var arrAvatar = [];
  for (var i = 0; i < 6; i++) {
    var avatar = 'img/avatar-' + arrX[i] + '.svg';
    arrAvatar.push(avatar);
  }
  var rendomAvatar = arrAvatar[Math.floor(Math.random() * arrAvatar.length)];

  return rendomAvatar;
};

var getPhoto = function () {
  var photoObjects = [];
  for (var i = 0; i < 25; i++) {
    var rendomMessage = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
    var rendomName = NAME[Math.floor(Math.random() * NAME.length)];
    var photoObject = {
      image: getUrl()[i],
      description: 'описание фотографии',
      likes: getLikes(),
      comment: {
        avatar: getAvatar(),
        message: rendomMessage,
        name: rendomName
      }
    };
    photoObjects.push(photoObject);
  }

  return photoObjects;
};

var usersPhotoMocks = getPhoto();

var renderUserPhoto = function (data) {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content

  for (var i = 0; i < data.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = getUrl()[i];
    photoElement.querySelector('.picture__likes').textContent = getLikes();
    photoElement.querySelector('.picture__comments').textContent = '1';

    var fragment = document.createDocumentFragment();
    fragment.appendChild(photoElement);
    pictures.appendChild(fragment);
  }
};

renderUserPhoto(usersPhotoMocks);
