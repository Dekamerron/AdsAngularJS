'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'LocalStorageModule']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api/');

app.config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/_homeViewUnregistered.html'
		})
		.when('/login', {
			templateUrl: 'templates/_login.html'
		})
		.when('/register', {
			templateUrl: 'templates/_register.html'
		})
		.otherwise({
			redirectTo: '/'
		});

		
		localStorageServiceProvider.setPrefix('adsApp');
	    localStorageServiceProvider.setStorageType('localStorage');
}]);