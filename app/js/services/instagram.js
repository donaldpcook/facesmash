'use strict';

module.exports = function($http, $q, localStorageService) {
  var token;
  var INSTAGRAM_API = 'https://api.instagram.com/v1';

  return {
    setToken: function(newToken) {
      localStorageService.set('token', newToken);

      return token = newToken;
    },

    login: function() {
      if(token) {
        return true;
      } else {
        window.location.href = 'https://instagram.com/oauth/authorize/?client_id=bcb7ebb1c8824e0a89babaf0298bd67c&redirect_uri=http://0.0.0.0:3000/auth&response_type=token';
      }
    },

    isLoggedIn: function() {
      if (!token && localStorageService.get('token')) {
        token = localStorageService.get('token');
      }

      return !!token;
    },

    getFollowedBy: function() {
      var deferred = $q.defer();

      $http.jsonp(INSTAGRAM_API + '/users/self/followed-by?callback=JSON_CALLBACK', {params: { access_token: token }})
        .success(function(data) {
          deferred.resolve(data.data);
        });

      return deferred.promise;
    },

    getPhotos: function(id) {
      var deferred = $q.defer();

      $http.jsonp(INSTAGRAM_API + '/users/' + id + '/media/recent?callback=JSON_CALLBACK', {params: { count: 100, access_token: token }})
        .success(function(data) {
          deferred.resolve(data.data);
        });

      return deferred.promise;
    }
  }
};
