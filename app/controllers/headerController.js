angular.module('myApp').controller('headerController', ['$scope','$location', function($scope,$location){
    
    $scope.getClass = function(path) {
        return ($location.path().indexOf(path) > -1) ? 'active' : 'inactive';   
}
}]);