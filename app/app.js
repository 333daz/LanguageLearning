var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

myApp.config( function($routeProvider) {
	$routeProvider.
		when('/home', {
                        templateUrl: 'app/partials/home.html',
			controller: 'mainController',
			// css: 'home.css';
                })
                .when('/profile', {
                	templateUrl: 'app/partials/profile.html',
                	controller: 'profileController'
                })
                .when('/activity', {
                	templateUrl: 'app/partials/activity.html',
                	controller: 'activityController'
                })
                .otherwise({
                        redirectTo: '/home'
                });
});

myApp.controller('mainController', ['$scope', function($scope){
	$scope.message = 'HomeController';
}]);

myApp.controller('profileController', ['$scope', function($scope) {
	$scope.statusSet = JSON.parse(localStorage.getItem("user"));
        console.log($scope.statusSet[0]);
}]);


