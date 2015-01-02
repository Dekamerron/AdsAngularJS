app.controller('AdsController', ['$scope', '$location', 'adsServices', function ($scope, $location, adsServices) {
	adsServices.getAllAds(
		function (data, status, headers, config) {
			$scope.data = data;
		},
		function (error, status, headers, config) {
			console.log(status, error);
		}
	);

	adsServices.getAllCategories(
		function (data, status, headers, config) {
			$scope.categories = data;
		},
		function (error, status, headers, config) {
			console.log(status, error);
		}
	);

	adsServices.getAllTowns(
		function (data, status, headers, config) {
			$scope.towns = data;
		},
		function (error, status, headers, config) {
			console.log(status, error);
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

	$scope.categoryIndex = -1;
	$scope.categoryClicked = function (category, $index) {
	    $scope.categoryIndex = $index;
	    $scope.categoryId = category.id;
	};

	$scope.townIndex = -1;
	$scope.townClicked = function (town, $index) {
	    $scope.townIndex = $index;
	    $scope.townId = town.id;
	};

}]);