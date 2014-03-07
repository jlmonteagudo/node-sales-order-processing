
angular.module('sop.sales.services', [])

	.constant('SalesOrderStates', [
		{ 
			id: 'received', 
			text: 'Received'
		},
		{
			id: 'preparing', 
			text: 'Preparing'
		}, 
		{
			id: 'closed', 
			text: 'Closed'			
		}
	])

	.factory('SalesService', ['Restangular', 'SalesOrderStates', function(Restangular, SalesOrderStates) {

		return {
			
			getList: function(params) {
				return Restangular.all('sales-orders').getList(params);
			},

			get: function(id) {
				return Restangular.one('sales-orders', id).get();
			},

			getSalesOrderStates: function() {
				return SalesOrderStates;
			}

		};

	}]);
