'use strict';

require('angular');
require('angular-ui-router');

angular.module('facesmash', ['ui.router', 'partials'])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url: '/',
      views: {
        'instagramLogin': {
          controller: 'InstagramController',
          templateUrl: '/instagram/instagram.html'
        },
        'facePP': {
          controller: 'FacePPController',
          templateUrl: '/facePP/facePP.html'
        }
      }
    });

    $stateProvider.state('auth', {
      url: '/auth/',
      views: {
        'instagramLogin': {
          controller: function() {
            console.log('here');
          },
          templateUrl: '/instagram/instagram.html'
        }
      }
    });
  }])

  .directive('facePPHud', require('./facePP/directives/facePPHud'))
  
  .service('FacePPService', require('./services/facepp'))
  .factory('Instagram', require('./services/instagram'))

  .controller('InstagramController', require('./instagram/instagram'))
  .controller('FacePPController', require('./facePP/facePP'))

  .controller('AppController', function() {
  });
