module.exports = function () {
    'use strict';
    return {
    
      link: function (scope, element) {
        console.log('hiya, hud reporting in');
      },
      scope: {},
      restrict: 'A'
    };
  };