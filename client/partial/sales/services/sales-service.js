
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
			},

			getCountSales: function(fromDate, toDate) {
				var params = {};

				params.fromDate = fromDate;
				params.toDate = toDate;
				return Restangular.one('sales-orders/count').get(params);
			},

			getAmountSales: function(fromDate, toDate) {
				var params = {};

				params.fromDate = fromDate;
				params.toDate = toDate;
				return Restangular.one('sales-orders/amount').get(params);
			}			

		};

	}]);
