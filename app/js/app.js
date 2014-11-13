'use strict';

require('angular');
require('angular-ui-router');
require('angular-local-storage');

angular.module('facesmash', ['ui.router', 'partials', 'LocalStorageModule'])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'localStorageServiceProvider', function($urlRouterProvider, $stateProvider, $locationProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('facesmash');

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url: '/',
      views: {
        'instagramLogin': {
          controller: 'InstagramController',
          templateUrl: '/instagram/instagram.html'
        }
      }
    });

    $stateProvider.state('auth', {
      url: '/auth/:access',
      views: {
        'instagramLogin': {
          controller: function($location, $state, Instagram) {
            var hash = $location.hash();

            Instagram.setToken(hash.substr(hash.indexOf('=')+1));

            $state.go('home');
          },
          templateUrl: '/instagram/instagram.html'
        }
      }
    });
  }])

  .factory('FacePP', require('./services/facepp'))
  .factory('Instagram', require('./services/instagram'))

  .controller('InstagramController', require('./instagram/instagram'))

  .controller('AppController', function() {
  });
