app.factory('adsServices', function ($resource, $http) {
	function getAllAds (success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/api/ads?PageSize=20&Startpage=1'
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers, config);
		});
	};

	function getAllCategories (success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/api/categories'
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers, config);
		});
	};

	function getAllTowns (success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/api/towns'
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers, config);
		});
	};

	return {
		getAllAds: getAllAds,
		getAllCategories: getAllCategories,
		getAllTowns: getAllTowns
	}
});