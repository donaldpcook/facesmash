//Directive
module.exports = function () {
    'use strict';
    return {
      scope: {
        fppsrc:'=src',
        src:'@',
        results:'@'
      },
      link: function (scope, element, attrs) {
        scope.faces = [];
        scope.getMouthPath = function (facePositions, smiling, imageH, imageW) {
          //original path M0,0 C00,25 100,25 100,0
          var path = "";
          if (facePositions.mouth_right === undefined || facePositions.mouth_left === undefined){
            return "path was not set because mouth_right or mouth_left were undefined";
          }
          //Starting point
          path = "M" + facePositions.mouth_left.x / 100 * imageH+ "," + facePositions.mouth_left.y / 100 * imageW+ " ";
          //Starting Control Point  (should be directly above or below the line, depending on the smile var)
         path += "C"+facePositions.mouth_left.x / 100 * imageH+ "," + ((facePositions.mouth_left.y + (smiling - 50) * 0.1) / 100) * imageW+ " ";//TODO: Factor in smile
          //Ending Control Point
         path += facePositions.mouth_right.x / 100 * imageH+ "," + ((facePositions.mouth_right.y + (smiling - 50) * 0.1) / 100) * imageW+ " ";//TODO: Factor in smile
          //Ending point
          path += facePositions.mouth_right.x / 100 * imageH+ "," + facePositions.mouth_right.y / 100 * imageW+ "";
          return path
        };
        if(scope.results.img_height === undefined){
          //load image size from nested image 
          element.find('img').bind('load', function() {
            scope.imageW = this.width;
            scope.imageH = this.height;
            scope.$apply();
          });
        }
        
        attrs.$observe('results', function(newResultsJson) {

          //validate the results are json
          if (newResultsJson.charAt(0) !== "{" && newResultsJson.charAt(0) !== "[") {
            //catch the loading message, or other non-json responces, and abort.
            return;
          }
          //parse them into an object
          var newResults = JSON.parse(newResultsJson);
          
          //obtain sizes from image, perhaps redundant given we've already got it, but the API is providing so I'm listening
          if (newResults.img_height != undefined) {
            console.log('scope.results.img_height was defined, using it ');
            scope.imageH = newResults.img_height;
          }
          if (newResults.img_width != undefined) {
            console.log('scope.results.img_width was defined, using it ');
            scope.imageW = newResults.img_width;
          }
          
          //We wanna do some math and re-inject it back into the face, we will walk the results injecting our solutions
          scope.faces = newResults.face;
          angular.forEach(scope.faces, function (value, key) {
            console.log('key,value',key,value);
            scope.faces[key].mouthPath = scope.getMouthPath(value.position, value.attribute.smiling.value, scope.imageW, scope.imageH);
            
          })
          

        })
        

      },
      templateUrl: '/facePP/directives/template.html',
      replace: true,
      restrict: 'E'
    };
  };