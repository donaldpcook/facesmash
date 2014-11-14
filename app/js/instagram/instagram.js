'use strict';

module.exports = function($scope, Instagram, Friends, FacePPService) {
  $scope.login = function() {
    if (Instagram.login()) {
      getFriends();
    }
  }

  $scope.getPhotos = function(friend) {
    friend.getPhotos();

    setTimeout(function() {
      friend.searchFeedForUser();
    }, 1000);
  }

  var getFriends = function() {
    Instagram.getFollowedBy().then(function(friends) {
      Friends.setFriends(friends);

      $scope.friends = Friends.friends;
    }, function() {
      // error handling
    });
  };

  if (Instagram.isLoggedIn()) {
    getFriends();
  }
};
