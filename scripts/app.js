'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api/');

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'AdsController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'AdsController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'AdsController'
		})
		.when('/user/home', {
			templateUrl: 'views/userHome.html',
			controller: 'UserController'
		})
		.otherwise({
			redirectTo: '/'
		});

		// window.routes = {
		//     "/": { 
		//         templateUrl: 'views/home.html',
		// 		controller: 'AdsController',
		// 		requireLogin: false
		// 	},
		//     "/login": {
		//     	templateUrl: 'views/login.html',
		// 		controller: 'AdsController',
		//         requireLogin: true
		//     },
		//     "/register": { 
		//     	templateUrl: 'views/register.html',
		// 		controller: 'AdsController',
		//         requireLogin: false
		// 	},
		// 	"/user/home": {
		// 		templateUrl: 'views/userHome.html',
		// 		controller: 'UserController',
		//         requireLogin: true
		// 	}
		// };

		// for(var path in window.routes) {
	 //        $routeProvider.when(path, window.routes[path]);
	 //    }

	 //    $routeProvider.otherwise({redirectTo: '/'});

		// }]).run(function(){
		// 	$rootScope.$on("$routeChangeStart", function(event, next, current) {
	 //        for(var i in window.routes) {
	 //            if(next.indexOf(i) != -1) {
	 //                if(window.routes[i].requireLogin && !authenticationService.isLoggedIn()) {
	 //                    alert("You need to be authenticated to see this page!");
	 //                    event.preventDefault();
	 //                }
	 //            }
	 //        }
	 //    });
	    

		
		// localStorageServiceProvider.setPrefix('adsApp');
	 //    localStorageServiceProvider.setStorageType('localStorage');
}]);