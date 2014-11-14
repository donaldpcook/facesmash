'use strict';

module.exports = function(FacePPService, Instagram, ImageAppender, $http) {
  function Friend(data) {
    this.name = data.username;
    this.id = data.id;
    this.profilePicture = data.profile_picture;
    this.faceIds = [];
  }

  Friend.prototype.setFace = function() {
    FacePPService.detectFace(this.profilePicture).then(function(data) {
      this.face = data;

      data.face.forEach(function(element) {
        this.faceIds.push(element.face_id);
        FacePPService.saveFace(element.face_id, this.name);
      }.bind(this));
    }.bind(this));
  }

  Friend.prototype.getPhotos = function() {
    Instagram.getPhotos(this.id).then(function(data) {
      this.feed = data;
    }.bind(this));
  }

  Friend.prototype.searchFeedForUser = function() {
    var images = [];

    this.feed.forEach(function(element) {
      images.push(element.images.standard_resolution.url);
      //FacePPService.detectFace(element.images.standard_resolution.url).then(function(data) {
        //debugger;
      //});
    });

    ImageAppender.appendImages(images).then(function(data) {
      debugger;
    });;
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
