'use strict';

module.exports = function($scope, Instagram) {
  $scope.login = function() {
    if (Instagram.login()) {
      getFriends();
    }
  }

  var getFriends = function() {
    Instagram.getFollowedBy().then(function(friends) {
      $scope.friends = friends;
    }, function() {
      // error handling
    });
  };

  if (Instagram.isLoggedIn()) {
    getFriends();
  }
};
