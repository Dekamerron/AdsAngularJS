app.factory('authentication', ['localStorageServiceProvider', function (localStorageServiceProvider) {
	var key = 'user';

	function saveUser (data) {
		// localStorageServiceProvider.set(key, data);
	}

	function getUser (data) {
		// localStorageServiceProvider.set(key);
	}

	return {
		saveUser: saveUser,
		getUser: getUser
	}
}]);