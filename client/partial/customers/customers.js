angular.module('sop.customers', [])
	.controller('CustomersController', ['$scope', '$http', 'Restangular', function($scope, $http, Restangular) {

		var apiCustomers = Restangular.all('customers');
		var params = 
		{
			conditions: {
				
			},

			likes: {
				name: ''
			},

			options: {
				limit: 20
			}
		};

		$scope.customers = apiCustomers.getList(params).$object;

	}]);
	