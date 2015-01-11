'use strict';

app.factory('authenticationService', function () {
	var key = 'user';

	function saveUser (data) {
		localStorage.setItem(key, angular.toJson(data));
	}

	function getUser () {
		return angular.fromJson(localStorage.getItem(key));
	}

	function removeUser (data) {
		localStorage.removeItem(key);
	}

	function getHeaders () {
		var headers = {};
		var userData = getUser();
		if (userData) {
			headers.Authorization = 'Bearer ' + getUser().access_token;
		}

		return headers;
	}

	function isLoggedIn () {
		return !!getUser();
	}

	function isAdmin () {
		var isAdmin = localStorage.getUser().isAdmin;
		return isAdmin;
	}

	return {
		saveUser: saveUser,
		getUser: getUser,
		removeUser: removeUser,
		getHeaders: getHeaders,
		isLoggedIn: isLoggedIn,
		isAdmin: isAdmin
	}
});