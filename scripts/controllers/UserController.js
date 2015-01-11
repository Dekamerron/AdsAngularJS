'use strict';

app.controller('UserController', 
	['$scope', '$location', '$routeParams', '$rootScope', 'adsService', 'userService', 'authenticationService', 
	function ($scope, $location, $routeParams, $rootScope, adsService, userService, authenticationService) {
		
		$scope.isLoggedIn = true;
		$scope.showFilter = true;
		$scope.areShowedUserAds = false;
		$scope.noAdsAvailable = false;
		$scope.isEditMode = false;
		$scope.userData = authenticationService.getUser();
		$scope.adStatus = '';
		$scope.curentAd = {};
		$scope.currentAdId = $routeParams.id;

		$scope.currentPageNumber = 1;
		$scope.startPage = 1;
		$scope.pageSize = 2;
		$scope.itemsPerPage = 2;

		$scope.currentCategory = { id: 0, name: 'All categories' };
		$scope.currentTown = { id: 0, name: 'All towns' };
		
		// adsService.getAllUserAds()
		// .$promise
		// .then(function (data) {
		// 	$scope.allUserAds = data;
		// 	// console.log(data);
		// });
		
		adsService.getAllCategories()
		.$promise
		.then(function (data) {
			$scope.categories = JSON.parse(JSON.stringify(data));
			$scope.categoriesForEdit = JSON.parse(JSON.stringify(data));
			$scope.categories.unshift({ id: 0, name: 'All categories' });
		});

		adsService.getAllTowns()
		.$promise
		.then(function (data) {
			$scope.towns = JSON.parse(JSON.stringify(data));
			$scope.towns.unshift({ id: 0, name: 'All towns' });
			$scope.townsForEdit = JSON.parse(JSON.stringify(data));
		});

		$scope.getAds = function (pageSize, startPage, status) {
			adsService.getAllAdsWithPaginingAndStatusForCurrentUser(pageSize, startPage, status)
			.$promise
			.then(function (data) {
				$scope.allUserAds = data;
				// console.log(data);
			});
		};

		$scope.getAds(2, 1, false);

		$scope.$watch('currentAdId', function () {
			if ($scope.currentAdId) {
				adsService.getAdById($scope.currentAdId)
				.$promise
				.then(function (data) {
					$scope.currentAd = data;
				});
			}
		});
		
		$scope.redirectToHome = function () {
			$location.path('/user/home');
			$scope.currentPage = 'Home';
			$scope.showAdditionalNav = false;
			$scope.areShowedUserAds = false;
			$scope.showFilter = true;
		};

		$scope.redirectToMyAds = function () {

			$scope.currentPage = 'My Ads';
			$scope.showAdditionalNav = true;
			$scope.areShowedUserAds = true;
			$scope.showFilter = false;
			$scope.adStatus = '';
			$scope.getAds(2, 1, $scope.adStatus);
			$scope.startPage = 1;
			$scope.currentPageNumber = 1;
			$location.path('user/ads');
		};

		$scope.redirectToPublishNewAd = function () {
			$scope.currentPage = 'Publish New Ad';
			$scope.showAdditionalNav = false;
		};

		$scope.redirectToEditProfile = function () {
			$scope.currentPage = 'Edit User Profile';
			$scope.showAdditionalNav = false;
		};

		$scope.showAllUserAds = function () {
			$scope.areShowedUserAds = true;
			$scope.adStatus = '';
			$scope.getAds(2, 1, $scope.adStatus);
		};

		$scope.showPublishedUserAds = function () {
			$scope.adStatus = 'Published';
			$scope.getAds(2, 1, $scope.adStatus);
			
		};

		$scope.showWaitingApprovalUserAds = function () {
			$scope.adStatus = 'WaitingApproval';
			$scope.getAds(2, 1, $scope.adStatus);
		};

		$scope.showInactiveUserAds = function () {
			$scope.adStatus = 'Inactive';
			$scope.getAds(2, 1, $scope.adStatus);
		};

		$scope.showRejectedUserAds = function () {
			$scope.adStatus = 'Rejected';
			$scope.getAds(2, 1, $scope.adStatus);
		};

		$scope.pageChange = function (pageNumber, isUserAds) {
			if (isUserAds) {
				$scope.getAds(2, pageNumber, $scope.adStatus);
				$scope.currentPageNumber = pageNumber;
			} else {
				$scope.adStatus = '';
				adsService.getAllAdsWithPagingAndFilter ($scope.pageSize, pageNumber, 0, 0)
				.$promise
				.then(function (data) {
					$scope.adsData = data;
					// console.log(data);
				});
			}
		};

		$scope.deactivateAd = function (ad) {
			adsService.deactivateAd(ad)
			.$promise
			.then(function (data) {
				$scope.successMessage('Ad successfully deactivated');
				$scope.adStatus = '';
				$scope.getAds(2, 1, $scope.adStatus);
			}, function(error) {
			    $scope.errorMessage('Ad failed to deactivate. ' + error.data.message);
			});
		};

		$scope.redirectToEditAdView = function (ad) {
			$scope.currentPage = 'Edit ad';
			$scope.currentAdId = ad.id;
			$location.path('/user/ads/edit/' + ad.id);
		};

		$scope.selectTown = function (town) {
			$scope.currentAd.townName = town.name;
			$scope.currentAd.townId = town.id;
		};

		$scope.selectCategory = function (category) {
			$scope.currentAd.categoryName = category.name;
			$scope.currentAd.categoryId = category.id;
		};

		$scope.selectTownForEdit = function (town) {
			$scope.currentAd.townName = town.name;
			$scope.currentAd.townId = town.id;
		};

		$scope.selectCategoryForEdit = function (category) {
			$scope.currentAd.categoryName = category.name;
			$scope.currentAd.categoryId = category.id;
		};

		$scope.cancel = function () {
			$scope.redirectToMyAds();
		};

		$scope.editAd = function () {
			$scope.currentAd.changeImage = true;
			adsService.editAd($scope.currentAdId, $scope.currentAd)
			.$promise
			.then(function (data) {
				$scope.successMessage('Advertisement #' + $scope.currentAdId + ' edited successfully.');
				$location.path('user/ads');
			}, function(error) {
			    $scope.errorMessage('Ad failed to edit. ' + error.data.message);
			});
		};

		$scope.deleteAd = function (adId) {
			adsService.deleteAd(adId)
			.$promise
			.then(function (data) {
				$scope.successMessage('Advertisement #' + adId + ' deleted successfully.');
				$location.path('user/ads');
			}, function(error) {
			    $scope.errorMessage('Ad failed to delete. ' + error.data.message);
			});
		};

		$scope.deleteImage = function () {
			$scope.currentAd.imageDataUrl = '';
		}

		$scope.$watch('allUserAds', function () {
			if ($scope.allUserAds && $scope.allUserAds.ads.length === 0) {
				$scope.noAdsAvailable = true;
			} else {
				$scope.noAdsAvailable = false;
			}
		});

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

	    $rootScope.$on('$routeChangeStart', function (event, next) {
	        var userAuthenticated = authenticationService.isLoggedIn(); 

	        if (!userAuthenticated && !next.isLogin) {

	            $location.path('/');
	        } else if (userAuthenticated && next.isLogin) {

	        	$location.path('/user/home');
	        }
	    });

	    $scope.selectTown = function (town, register) {
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

		$scope.$watch('allUserAds', function () {
			if ($scope.allUserAds) {
				console.log($scope.allUserAds.ads);
			}
			
		});
}]);