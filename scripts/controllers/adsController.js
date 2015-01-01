app.controller('AdsController', ['$scope', '$location', 'adsServices', function ($scope, $location, adsServices) {
	adsServices.getAllAds(
		function (data, status, headers, config) {
			$scope.data = data;
		},
		function (error, status, headers, config) {
			// console.log(status, error);
		}
	);

	$scope.login = function () {
		$location.path('/login');
	};

	$scope.register = function () {
		$location.path('/register');
	};

	$scope.back = function () {
		$location.path('/');
	};

}]);