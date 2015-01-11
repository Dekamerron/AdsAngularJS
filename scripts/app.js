'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api/');

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'AdsController',
			isLogin: true
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'AdsController',
			isLogin: true
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'AdsController',
			isLogin: true
		})
		.when('/user/home', {
			templateUrl: 'views/userHome.html',
			controller: 'UserController',
			isLogin: false
		})
		.when('/user/ads', {
			templateUrl: 'views/userAds.html',
			controller: 'UserController',
			isLogin: false
		})
		.when('/user/ads/edit/:id', {
			templateUrl: 'views/userEditAd.html',
			controller: 'UserController',
			isLogin: false
		})
		.otherwise({
			redirectTo: '/'
		});

		// $rootScope.$on('$routeChangeStart', function (event, next) {
	 //        var userAuthenticated = ...; 

	 //        if (!userAuthenticated && !next.isLogin) {

	 //            $location.path('/User/LoginUser');
	 //        }
	 //    });
}]);