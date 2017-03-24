// щоб передати дані далі по ланцюгу промісів ця
// ф-ція приймає і передає data
var hideLoader = function(data) {
  var loader = document.getElementById('loader');

  loader.classList.add('hide');

  return data;
};

var showLoader = function() {
  var loader = document.getElementById('loader');

  loader.classList.remove('hide');
};


//====================================================
var printUserInf = function(userInfCont, user) {
  var html = '<h1>Користувач: ' + user.name + '</h1>'
  userInfCont.insertAdjacentHTML('beforeEnd', html);
}

var printAlbums = function(albumsCnt, albums) {
  var html = '';

  albums.forEach((album) => {
    html += '<h3>Альбом: ' + album.title + '</h3><ul>';

    album.photos.forEach((photo) => {
      html += '<li><a target="_blank" href="' + photo.url + '">' + photo.title + '</a></li>'
    });
    html += '</ul>';
  });

  albumsCnt.insertAdjacentHTML('beforeEnd', html);
}

var print = function(container) {
  container.innerHTML = '';

  return function (user) {
    console.log(user);
    return new Promise((resolve, reject) => {
      printUserInf(container, user);
      printAlbums(container, user.albums);

      return resolve('ok');
    });
  }
}
//====================================================

var API_URL = 'https://jsonplaceholder.typicode.com';
var ALBUMS = '/albums';
var USERS = '/users'
var PHOTOS = '/photos';


var toJson = R.invoker(0, 'json');

var allToJson = R.compose(
  R.bind(Promise.all, Promise),
  R.map(toJson)
);

var getUserId = function(inputId) {
    return document.getElementById(inputId).value;
}

// приймає uiserId
var getUser = R.compose(
    fetch,
    R.concat(API_URL + USERS + '?id=')
  );

var getAlbumsFor = R.compose(
    fetch,
    R.concat(API_URL + ALBUMS + '?userId='),
    R.prop('id')
  );

var addAlbumsToUser = R.set(R.lensProp('albums'));


var addAlbums = function(user) {
  return new Promise((resolve, reject) => {
    getAlbumsFor(user)
      .then(toJson)
      .then(addAlbumsToUser(R.__, user))
      .then(resolve)
      .catch(reject);
  });
}

var getPhotos = R.compose(
    fetch,
    R.concat(API_URL + PHOTOS + '?albumId='),
    R.prop('id')
  );


var addPhotosToAlbums = R.curry(function(user, photos) {

    user.albums.forEach(function(album, i) {
      album.photos = photos[i];
    });

    return user;
});

var combineWithPhotos = function(user) {
  var
    photosRequests = user.albums.map(getPhotos);

    return new Promise((resolve, reject) => {
      Promise.all(photosRequests)
        .then(allToJson)
        .then(addPhotosToAlbums(user))
        .then(resolve)
        .catch(reject);
    });
}

var loadAlbumWithPhotos = function() {
  var
    photosCnt = document.getElementById('output'),
    uid = getUserId('user-id');

  showLoader();

  getUser(uid)
    .then(toJson)
    .then((arrWithUsr) => arrWithUsr[0])  // ми отримаєм 1 лементний масив, а треба лише обєкт
    .then(addAlbums)                      // завантажує і додає масив альбомів до обєкта користувача
    .then(combineWithPhotos)              // завантажує і додає фото до альбомів
    .then(hideLoader)
    .then(print(photosCnt));
};

var loadAlbumBtn = document.getElementById('load-album');
loadAlbumBtn.addEventListener('click', loadAlbumWithPhotos);

var logUser = function(user) {
  console.log(user);
}