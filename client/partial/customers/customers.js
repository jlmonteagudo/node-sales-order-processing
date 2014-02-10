angular.module('sop.customers', [])
	.controller('CustomersController', ['$scope', '$http', 'Restangular', function($scope, $http, Restangular) {

		var apiCustomers = Restangular.all('users');
		var params = 
		{
			conditions: {
				
			},

			likes: {
				name: 'diego'
			},

			options: {
				limit: 20
			}
		};

		$scope.customers = apiCustomers.getList(params).$object;

	}]);
	