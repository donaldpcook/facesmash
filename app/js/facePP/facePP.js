//Controller
module.exports = function($scope, $timeout, FacePPService) {
	'use strict';

  $scope.results = 'Loading...';
  $scope.facePPCallback = function (err, results) {
    if (err) {
      console.log('err', err);
      $scope.results = 'Load failed.';
    }else{
      console.log('results', results);
      $timeout(function () {
        $scope.resultsStringified = JSON.stringify(results,2);
        $scope.results = results;
      },0);
    }
  };
  $scope.images = [""]
  $scope.changeImage = function (imgUrl) {
    $scope.imageUrl = imgUrl;
    FacePPService.request($scope.imageUrl, $scope.facePPCallback);
  }
  $scope.imageUrl = FacePPService.defaultImageUrl;
  
  FacePPService.request($scope.imageUrl, $scope.facePPCallback);

};
