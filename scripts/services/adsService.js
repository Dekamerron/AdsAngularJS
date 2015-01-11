'use strict';

app.factory('adsService', ['$resource', 'baseServiceUrl', 'authenticationService',
	function ($resource, baseServiceUrl, authenticationService) {

	var adsResource = $resource(baseServiceUrl + 'ads:adId', { adId: '@id'}, {
		update: {
			method: 'PUT'
		}
	});

	function getAllPublicAds () {
		return adsResource.get();
	}

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

	function addAd (ad) {
		return adsResource.save(ad);
	}

	function getAllCategories () {
		var categoryResource = $resource(baseServiceUrl + 'categories');
		return categoryResource.query();
	}

	function getAllTowns () {
		var townResource = $resource(baseServiceUrl + 'towns');
		return townResource.query();
	}

	function getAllUserAds () {
		var userAccessToken = authenticationService.getHeaders();
		var userAdsResource = $resource(baseServiceUrl + 'user/ads', {}, {
			get: {
				method: 'GET',
				isArray:false,
				headers: {
					'Authorization': userAccessToken.Authorization
				}
			}
		});

		return userAdsResource.get();
	}

	function getAllAdsWithPaginingAndStatusForCurrentUser (pageSize, startPage, status) {
		var userAccessToken = authenticationService.getHeaders();
		var urlString = '';

		if (status) {
			urlString += 'user/ads?pagesize=' + pageSize + '&startpage=' + startPage + '&status=' + status;
			
		} else {
			urlString += 'user/ads?pagesize=' + pageSize + '&startpage=' + startPage;
		}

		var adsWithPagingResourceForUser = $resource(baseServiceUrl + urlString, {}, {
				get: {
					method: 'GET',
					isArray: false,
					headers: {
						'Authorization': userAccessToken.Authorization
					}
				}
		});

		return adsWithPagingResourceForUser.get();
	}

	function deactivateAd (ad) {
		var urlString =  'user/ads/deactivate/' + ad.id;
		var userAccessToken = authenticationService.getHeaders();

		var deactivateAd = $resource(baseServiceUrl + urlString, {}, {
			update: {
				method: 'PUT',
				isArray: false,
				headers: {
					'Authorization': userAccessToken.Authorization
				}
			}
		});
		
		return deactivateAd.update();
	}

	function getAdById (id) {
		var urlString =  'user/ads/' + id;
		var userAccessToken = authenticationService.getHeaders();

		var editAd = $resource(baseServiceUrl + urlString, {}, {
			get: {
				method: 'GET',
				isArray: false,
				headers: {
					'Authorization': userAccessToken.Authorization
				}
			}
		});
		
		return editAd.get();
	}

	function editAd (adId, ad) {
		var urlString =  'user/ads/' + adId;
		var userAccessToken = authenticationService.getHeaders();

		var editAd = $resource(baseServiceUrl + urlString, {}, {
			update: {
				method: 'PUT',
				isArray: false,
				headers: {
					'Authorization': userAccessToken.Authorization
				}
			}
		});

		return editAd.update({}, ad); 
	}

	function deleteAd (adId)  {
		// return adsResource.delete({ id: adId });
		var urlString =  'user/ads/' + adId;
		var userAccessToken = authenticationService.getHeaders();

		var deleteAd = $resource(baseServiceUrl + urlString, {}, {
			delete: {
				method: 'DELETE',
				isArray: false,
				headers: {
					'Authorization': userAccessToken.Authorization
				}
			}
		});

		return deleteAd.delete();
	}

	return {
		getAllAdsWithPaginingAndStatusForCurrentUser: getAllAdsWithPaginingAndStatusForCurrentUser,
		getAllAdsWithPagingAndFilter: getAllAdsWithPagingAndFilter,
		getAllAdsWithFilter: getAllAdsWithFilter,
		getAllCategories: getAllCategories,
		getAllPublicAds: getAllPublicAds,
		getAllUserAds: getAllUserAds,
		deactivateAd: deactivateAd,
		getAllTowns: getAllTowns,
		getAdById: getAdById,
		deleteAd: deleteAd,		
		editAd: editAd,		
		addAd: addAd,

	}
}]);