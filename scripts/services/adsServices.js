'use strict';

app.factory('adsServices', ['$resource', '$http', 'baseServiceUrl', function ($resource, $http, baseServiceUrl) {

	function getAllAds (success, error) {
		$http({
			method: 'GET',
			url: baseServiceUrl + 'ads?PageSize=20&Startpage=1'
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
			url:  baseServiceUrl + 'categories'
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
			url: baseServiceUrl + 'towns'
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
}]);