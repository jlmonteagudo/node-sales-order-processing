
angular.module('sop.sales.services', [])


	.factory('SalesService', ['Restangular', function(Restangular) {

		return {
			
			getList: function(params) {
				return Restangular.all('sales-orders').getList(params);
			},

			get: function(id) {
				return Restangular.one('sales-orders', id).get();
			}

		};

	}]);
