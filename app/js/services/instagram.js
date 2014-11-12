'use strict';

module.exports = function() {
  var token;

  return {
    login: function() {
      if(!token) {
        window.location.href = 'https://instagram.com/oauth/authorize/?client_id=bcb7ebb1c8824e0a89babaf0298bd67c&redirect_uri=http://0.0.0.0:3000/auth&response_type=token';
      }
    }
  }
};
