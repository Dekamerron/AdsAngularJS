'use strict';

app.factory('userServices', ['$resource', 'baseServiceUrl', 'authentication', 
	function ($resource, baseServiceUrl, authentication) {
	
	function registerUser (user) {
		return $resource(baseServiceUrl + 'user/register')
			.save(user)
			.$promise
			.then(function (data) {
				authentication.saveUser(data);
			});
	};

	function loginUser (user) {

	};

	function logoutUser () {

	};

	return {
		registerUser: registerUser,
		loginUser: loginUser,
		logoutUser: logoutUser
	}
}]);