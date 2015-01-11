'use strict';

app.factory('adsService', ['$resource', '$http', '$q', 'baseServiceUrl', 
	function ($resource, $http, $q, baseServiceUrl) {

	var adsResource = $resource(baseServiceUrl + 'ads:adId', { adId: '@id'}, {
		update: {
			method: 'PUT'
		}
	});

	function getAllPublicAds () {
		return adsResource.get();
	}

	// function getAllUserAds () {
	// var userAdsResource = $resource(baseServiceUrl + 'user/ads');
	// 	return userAdsResource
	// }

	function getAllAdsWithFilter (townId, categoryId) {
		var urlString = '';

		if (townId == 0) {
			urlString = 'ads?categoryid=' + categoryId;
		} else if (categoryId == 0) {
			urlString = 'ads?townid=' + townId;
		} else {
			urlString = 'ads?townid=' + townId + '&categoryid=' + categoryId;
		}

		var adsWithFilterResource = $resource(baseServiceUrl + urlString);
		
		return adsWithFilterResource.get();
	}

	function getAllAdsWithPagingAndFilter (pageSize, startPage, townId, categoryId) {
		var urlString = 'ads?pagesize=' + pageSize + '&startpage=' + startPage;

		if (townId == 0 && categoryId != 0) {
			urlString +=  '&categoryId=' + categoryId;
		} else if (categoryId == 0 && townId != 0) {
			urlString += '&townId=' + townId;
		} else if (townId != 0 && categoryId != 0) {
			urlString += '&townId=' + townId + '&categoryId=' + categoryId;
		}

		var adsWithPagingResource = $resource(baseServiceUrl + urlString);
		
		return adsWithPagingResource.get();
	}

	function editAd (adId, ad) {
		return adsResource.update({ id: adId }, ad); 
	}

	function getAdDyId (adId) {
		return adsResource.get({ id: adId });
	}

	function addAd (ad) {
		return adsResource.save(ad);
	}

	function deleteAd (adId)  {
		return adsResource.delete({ id: adId});
	}

	function getAllCategories () {
		var categoryResource = $resource(baseServiceUrl + 'categories');
		return categoryResource.query();
	}

	function getAllTowns () {
		var townResource = $resource(baseServiceUrl + 'towns');
		return townResource.query();
	}

	return {
		getAllCategories: getAllCategories,
		getAllTowns: getAllTowns,
		getAllPublicAds: getAllPublicAds,
		editAd: editAd,
		getAdDyId: getAdDyId,
		addAd: addAd,
		deleteAd: deleteAd,
		getAllAdsWithPagingAndFilter: getAllAdsWithPagingAndFilter,
		getAllAdsWithFilter: getAllAdsWithFilter
	}
}]);