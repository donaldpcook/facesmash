'use strict';

module.exports = function($http, $q) {
  var IA_API = 'https://image-appender.herokuapp.com/?images=';

  return {
    appendImages: function(images) {
      var deferred = $q.defer();

      var imageString = images.join('&images=');

      $http.get(IA_API + imageString).success(function(data) {
        return deferred.resolve(data);
      });

      return deferred.promise;
    }
  }
};
