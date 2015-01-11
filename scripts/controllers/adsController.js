'use strict';

app.controller('AdsController', 
	['$scope', '$location', 'adsService', 'userService', 'authenticationService',
	function ($scope, $location, adsService, userService, authenticationService) {
	
	$scope.user = {};
	$scope.loginInfo = {};
	$scope.currentPage = 'Home';
	$scope.isLoggedIn = authenticationService.isLoggedIn();
	// $scope.isFilterViewShowed = true;
	// $scope.areAllPublicAdsShowed = true;
	$scope.noAdsAvailable = false;
	$scope.isLoggedIn = false;

	$scope.currentPageNumber = 1;
	$scope.startPage = 1;
	$scope.pageSize = 10;
	$scope.itemsPerPage = 10;

	$scope.currentCategory = { id: 0, name: 'All categories' };
	$scope.currentTown = { id: 0, name: "All towns" };
	$scope.currentRegisterTown = { id: 0, name: "Please Select Town" };

	$scope.reloadAds = function (pageNumber) {
		adsService.getAllAdsWithPagingAndFilter($scope.pageSize, pageNumber, $scope.currentTown.id, $scope.currentCategory.id)
		.$promise
		.then(function (data) {
			$scope.adsData = data;
			// console.log(data);
		});
	};

	$scope.successMessage = function showSuccessMessage(msg) {
        noty({
            text: msg,
            type: 'success',
            layout: 'topCenter',
            timeout: 3000}
        );
    };

    $scope.errorMessage = function showErrorMessage(msg) {
        noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: 3000}
        );
    };

	$scope.reloadAds(1);

	adsService.getAllTowns()
	.$promise
	.then(function (data) {
		$scope.registerTowns = JSON.parse(JSON.stringify(data));
		$scope.towns = JSON.parse(JSON.stringify(data));		
		$scope.towns.unshift({ id: 0, name: "All towns" });
		$scope.currentTown = $scope.towns[0];
	});


	

	adsService.getAllCategories()
	.$promise
	.then(function (data) {
		$scope.categories = JSON.parse(JSON.stringify(data));
		$scope.categories.unshift({ id: 0, name: 'All categories' });
		$scope.currentCategory = $scope.categories[0];
	});

	$scope.redirectToHome = function () {
		$location.path('/');
		$scope.currentPage = 'Home';
	};

	$scope.redirectTologin = function () {
		$scope.currentPage = 'Login';
		$scope.loginInfo = {};
		$location.path('/login');
	};

	$scope.redirectToRegister = function () {
		$scope.currentPage = 'Register';
		$location.path('/register');
	};

	$scope.register = function () {
		userService.registerUser($scope.user)
		.$promise
		.then(function () {
			$scope.currentPage = 'Login';
			$scope.loginInfo = {};
			$scope.successMessage("Register success");
			$location.path('/login');
		}, function(error) {
		    $scope.errorMessage("Register failed. " + error.data.message);
		});
	};

	$scope.login = function () {
		userService.loginUser($scope.loginInfo)
		.$promise
		.then(function (data) {
			$scope.userData = data;
			// console.log(data);
			$scope.isLoggedIn = authenticationService.isLoggedIn();
			$scope.currentCategory = $scope.categories[0];
			$scope.currentTown = $scope.towns[0];
			$scope.reloadAds(1);
			$scope.successMessage("Login success");
			$scope.isLoggedIn = true;
			$location.path('/user/home');
		}, function(error) {
		    $scope.errorMessage("Login failed. " + error.data.error_description);
		});
	};

	$scope.logout = function () {
		userService.logoutUser();
		$scope.currentCategory = $scope.categories[0];
		$scope.currentTown = $scope.towns[0];
		$scope.reloadAds(1);
		$scope.successMessage("Logout success");
		$scope.isLoggedIn = false;
		$scope.redirectToHome();
	};

	$scope.cancel = function () {
		$scope.currentPage = 'Home';
		$location.path('/');
	};

	$scope.townAndCategoryFilter = function (data) {
		if ((data.categoryId == $scope.currentCategory.id || $scope.currentCategory.id == 0) &&
			(data.townId == $scope.currentTown.id || $scope.currentTown.id == 0)) {
			return true;
		} else {
			return false;
		}
	};

	$scope.selectTown = function (town, register) {
		if (register) {
			$scope.user.townId = town.id;
			$scope.currentRegisterTown = town;
		}

		$scope.currentTown = town;
		adsService.getAllAdsWithFilter($scope.currentTown.id, $scope.currentCategory.id)
		.$promise
		.then(function (data) {
			$scope.adsData = data;
			// console.log(data);
		});
	};

	$scope.selectCategory = function (category) {
		$scope.currentCategory = category;

		adsService.getAllAdsWithFilter($scope.currentTown.id, $scope.currentCategory.id)
		.$promise
		.then(function (data) {
			$scope.adsData = data;
			// console.log(data);
		});
	};

	$scope.pageChange = function (pageNumber) {
		$scope.reloadAds(pageNumber);
	};

	$scope.$watch('adsData', function () {
		if ($scope.adsData && $scope.adsData.ads.length === 0) {
			$scope.noAdsAvailable = true;
		} else {
			$scope.noAdsAvailable = false;
		}
	});
}]);