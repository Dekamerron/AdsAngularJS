'use strict';

app.controller('UserController', 
	['$scope', '$location', 'adsService', 'userService', 'authenticationService',
	function ($scope, $location, adsService, userService, authenticationService) {
		
		$scope.isLoggedIn = true;
		$scope.showFilter = true;
		$scope.areShowedUserAds = false;
		$scope.userData = authenticationService.getUser();
		
		$scope.redirectToHome = function () {
			$location.path('/user/home');
			$scope.currentPage = 'Home';
			$scope.showAdditionalNav = false;
			$scope.areShowedUserAds = false;
		};

		$scope.redirectToMyAds = function () {
			$scope.currentPage = 'My Ads';
			$scope.showAdditionalNav = true;
			$scope.areShowedUserAds = true;
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
		};

		$scope.showPublishedUserAds = function () {

		};

		$scope.showWaitingApprovalUserAds = function () {

		};

		$scope.showInactiveUserAds = function () {

		};

		$scope.showRejectedUserAds = function () {

		};

		// $rootScope.$on("$routeChangeStart", function(event, next, current) {
	 //        for(var i in window.routes) {
	 //            if(next.indexOf(i) != -1) {
	 //                if(window.routes[i].requireLogin && !authenticationService.isLoggedIn()) {
	 //                    alert("You need to be authenticated to see this page!");
	 //                    event.preventDefault();
	 //                }
	 //            }
	 //        }
	 //    });
}]);