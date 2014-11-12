'use strict';

module.exports = function($scope, Instagram) {
  $scope.login = function() {
    Instagram.login();
  }
};
