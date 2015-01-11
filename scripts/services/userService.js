'use strict';

app.factory('userService', ['$resource', 'baseServiceUrl', 'authenticationService',
	function ($resource, baseServiceUrl, authenticationService) {
	
	function registerUser (user) {
		var resource =  $resource(baseServiceUrl + 'user/register')
			.save(user);
		resource.$promise
			.then(function (data) {
				authenticationService.saveUser(data);
			});

		return resource;
	};

	function loginUser (user) {
		var resource = $resource(baseServiceUrl + 'user/login')
			.save(user);
		resource.$promise
			.then(function (data) {
				authenticationService.saveUser(data);
			});

		return resource;
	};

	function logoutUser () {
		authenticationService.removeUser();
	};

	return {
		registerUser: registerUser,
		loginUser: loginUser,
		logoutUser: logoutUser
	}
}]);