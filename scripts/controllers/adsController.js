app.controller('AdsController', ['$scope', '$location', 'adsServices', function ($scope, $location, adsServices) {
	adsServices.getAllAds(
		function (data, status, headers, config) {
			$scope.data = data;
			console.log(data);
		},
		function (error, status, headers, config) {
			console.log(status, error);
		}
	);

	$scope.convertImage = function (imgData) {
		return {
			backgroundImage: 'url(' + imgData + ')'
		}
	};

	$scope.login = function () {
		$location.path('/login');
	};
}]);