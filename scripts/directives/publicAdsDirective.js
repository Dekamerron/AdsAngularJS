app.directive('publicAds', function () {
	return {
		controller: '../PublicAdsController.js',
		restrict: 'E',
		templateUrl: 'templates/public/publicAds.html',
		replace: true
	}
});