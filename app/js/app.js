'use strict';

require('angular');
require('angular-ui-router');

angular.module('facesmash', ['ui.router', 'partials'])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      url: '/home',
      views: {
        'instagramLogin': {
          controller: 'InstagramController',
          templateUrl: '/instagram/instagram.html'
        }
      }
    });
  }])

  .factory('FacePP', require('./services/facepp'))

  .controller('InstagramController', require('./instagram/instagram'))

  .controller('AppController', function() {
  });
