
angular.module('sop.customers', [])

	.factory('CustomersService', ['Restangular', function(Restangular) {
		return Restangular.all('customers');
	}])


	.controller('CustomersListController', ['$scope', '$http', 'CustomersService', '$modal', function($scope, $http, CustomersService, $modal) {

		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;

		var params = {
			filters: {},
			options: {
				skip: (($scope.currentPage - 1) * $scope.itemsPerPage),
				limit: $scope.itemsPerPage
			}
		};

		$scope.customers = CustomersService.getList(params).$object;

		$scope.selectPage = function (pageNumber) {
			$scope.currentPage = pageNumber;
			params.options.skip = (($scope.currentPage - 1) * $scope.itemsPerPage);
			CustomersService.getList(params).then(function(customers) {
				$scope.customers = customers;
			});
		};

		$scope.$watch('filters.name', function (val) {
			params.filters.name = val;
			$scope.customers = CustomersService.getList(params).$object;
		});

		$scope.$watch('filters.address', function (val) {
			params.filters.address = val;
			$scope.customers = CustomersService.getList(params).$object;
		});

		$scope.$watch('filters.state', function (val) {
			params.filters.state = val;
			$scope.customers = CustomersService.getList(params).$object;
		});

		$scope.$watch('filters.country', function (val) {
			params.filters.country = val;
			$scope.customers = CustomersService.getList(params).$object;
		});

		$scope.view = function(customer) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/customers/customers-view.html',
				controller: 'CustomersViewController',
				resolve: {
					customer: function () {
						return customer;
					}
				}
			});
		};

		$scope.edit = function(customer) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/customers/customers-edit.html',
				controller: 'CustomersEditController',
				resolve: {
					customer: function () {
						return customer;
					}
				}
			});
		};


	}])


	.controller('CustomersViewController', ['$scope', '$modalInstance', 'customer', function($scope, $modalInstance, customer) {

		$scope.customer = customer;
		$scope.ok = function () {
			$modalInstance.close(customer);
		};

	}])


	.controller('CustomersEditController', ['$scope', '$modalInstance', 'customer', function($scope, $modalInstance, customer) {

		$scope.customer = customer;
		$scope.ok = function () {
			$modalInstance.close(customer);
		};

	}]);
