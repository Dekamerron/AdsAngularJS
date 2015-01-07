'use strict';

app.controller('AdsController', ['$scope', '$location', 'adsServices', function ($scope, $location, adsServices) {
	
	$scope.loader = {};
	$scope.townId = 0;
	$scope.categoryId = 0;

	adsServices.getAllAds(
		function (data, status, headers, config) {
			$scope.data = data;
			// console.log(data);
		},
		function (error, status, headers, config) {
			console.log(status, error);
		}
	);

	adsServices.getAllCategories(
		function (data, status, headers, config) {
			$scope.categories = data;
			// $scope.categories.unshift({ id: 0, name: 'All', selected: 'selected'});
			// $scope.categoryId =  $scope.categories[0];
		},
		function (error, status, headers, config) {
			console.log(status, error);
		}
	);

	adsServices.getAllTowns(
		function (data, status, headers, config) {
			$scope.towns = data;
			// console.log($scope.towns);
			// $scope.towns.unshift({ id: 0, name: 'All', selected: 'selected'});
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

	// $scope.categoryIndex = -1;
	// $scope.categoryClicked = function (category, $index) {
	//     $scope.categoryIndex = $index;
	//     $scope.categoryId = category.id;
	// };

	// $scope.townIndex = -1;
	// $scope.townClicked = function (town, $index) {
	//     $scope.townIndex = $index;
	//     $scope.townId = town.id;
	// };

	
	// $scope.$watch('townId', function () {
	// 	console.log($scope.townId);
	// });

	// $scope.$watch('categoryId', function () {
	// 	console.log($scope.categoryId);
	// });

	// $scope.town = {};
	// $scope.category = {};

	// $scope.selectTown = function (townId) {
	// 	$scope.townId = townId;
	// 	console.log($scope.townId);
	// };

	$scope.townAndCategoryFilter = function (data) {
		// console.log(data);
		if ((data.categoryId == $scope.categoryId && data.townId == $scope.townId) || 
			($scope.townId == 0 && $scope.categoryId == 0)) {
			return true;
		} else {
			return false;
		}
	};

}]);