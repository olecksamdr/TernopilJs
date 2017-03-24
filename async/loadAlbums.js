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

var print = function(container, user) {
  container.innerHTML = '';
  
  printUserInf(container, user);
  printAlbums(container, user.albums);

  }
//====================================================

var API_URL = 'https://jsonplaceholder.typicode.com';
var ALBUMS = '/albums';
var USERS = '/users'
var PHOTOS = '/photos';

var toJson = function(res) {
  return res.json();
};

var allToJson = function(responses) {
  return Promise.all(responses.map(toJson));
};

var getUser = function(uid) {
  return fetch(API_URL + USERS + '?id=' + uid)
          .then(toJson)
          .then(arr => arr[0]); // ми отримаєм 1 лементний масив, а треба лише обєкт 
}

var getUserId = function(inputId) {
  return document.getElementById(inputId).value;
}

var getAlbumsFor = function(user) {
  return fetch(API_URL + ALBUMS + '?userId=' + user.id)
          .then(toJson);
}

var getPhotos = function(album) {
  return fetch(API_URL + PHOTOS + '?albumId=' + album.id)
          then(toJson);
}


var addPhotosToAlbums = async function(albums) {
  var photosRequests = albums.map(getPhotos);

  var photos = await Promise.all(photosRequests).then(allToJson);

  albums.forEach(function(album, i) {
    album.photos = photos[i];
  });

  return albums;
}

var loadAlbumWithPhotos = async function() {
  try {

    var
      photosCnt = document.getElementById('output'),
      uid = getUserId('user-id');

    showLoader();

    var user = await getUser(uid);
    var albums = await getAlbumsFor(user);
    
    albums = await addPhotosToAlbums(albums);
    user.albums = albums;

    hideLoader();
    print(photosCnt, user);

    console.log(user);

  } 
  catch(e) {
    alert(e);
    throw e;
  }
}

var loadAlbumBtn = document.getElementById('load-album');
loadAlbumBtn.addEventListener('click', loadAlbumWithPhotos)
