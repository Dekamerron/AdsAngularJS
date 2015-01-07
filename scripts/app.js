'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute'])
	.config(function ($routeProvider) {
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
	})