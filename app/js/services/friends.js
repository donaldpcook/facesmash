'use strict';

module.exports = function(FacePPService) {
  function Friend(data) {
    this.profilePicture = data.profile_picture;
  }

  Friend.prototype.setFace = function() {
    FacePPService.detectFace(this.profilePicture).then(function(data) {
      this.face = data;
      debugger;
    }.bind(this));
  }

  return {
    friends: [],

    setFriends: function(data) {
      data.forEach(function(element) {
        this.friends.push(new Friend(element));
      }, this);
    }
  }
};
