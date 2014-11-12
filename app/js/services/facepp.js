/*global module: false, console: false, FacePP: false */

//require('faceppsdk');

module.exports = function () {
    'use strict'; 
    var facePP = this;
    facePP.defaultImageUrl = 'https://scontent-b-lga.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/164160_691464392895_3756847_n.jpg?oh=a098e5e292eb74c65bf6d5554fb7f65b&oe=54EAD461';
    facePP.apiKey = 'abf45752049a93d9f00e89123afe1ce3';
    facePP.apiSecret = 'p210gti4Ek5w_CmqJLPFfdBkApfl1sxb';
    
    facePP.api = new FacePP(facePP.apiKey, facePP.apiSecret, {apiURL: 'http://apius.faceplusplus.com/v2'});

    facePP.results = 'Loading...';
    
    facePP.callback = function (err, result) {
      console.log('Default call back. You probably wanted to override or provide your own, but whatevs.');
      if (err) {
        facePP.results = 'Load failed.';
        return;
      }
      facePP.results = JSON.stringify(result);

    };
    
    facePP.request = function (url, callback) {
      if (typeof(callback) === 'function') {
        facePP.callback = callback;
      }
      
      if (url===undefined || url === '' || url === null) {
        console.log('using default image, as url was not set!');
        url = facePP.defaultImageUrl;
      }

      facePP.api.request('detection/detect', {
         url: url
      }, function(err, result) {
        facePP.callback(err, result);
      });
    };
  };