(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.checkIfTooMuch = function () {
    var foodCounter = 0;
    if ($scope.lunch != undefined && $scope.lunch != "") {
        foodCounter = $scope.lunch.split(",").length;
    }
    if (foodCounter == 0) {
        $scope.message = "Please enter data first";
    } else if (foodCounter <= 3) {
        $scope.message = "Enjoy!";
    } else {
        $scope.message = "Too much!";
    }
  };
}

})();
