var app = angular.module('app', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('login', {
				templateUrl: '_login.html'
			})
			.when('register', {
				templateUrl: '_register.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	})