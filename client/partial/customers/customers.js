
angular.module('sop.customers', ['sop.customers.services'])

	.controller('CustomersListController', ['$scope', 'CustomersService', '$modal', '$timeout', function($scope, CustomersService, $modal, $timeout) {

		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		$scope.alerts = [];


		var filterTimeout;

		var params = {
			filters: {},
			options: {
				skip: (($scope.currentPage - 1) * $scope.itemsPerPage),
				limit: $scope.itemsPerPage
			}
		};

		var getParamsFilters = function() {
			return {
				name: $scope.filters.name,
				address: $scope.filters.address,
				state: $scope.filters.state,
				country: $scope.filters.country
			};
		};


		$scope.getListCustomers = function() {
			if (filterTimeout) { $timeout.cancel(filterTimeout); }
			filterTimeout = $timeout(function() {
				params.filters = getParamsFilters();
				$scope.customers = CustomersService.getList(params).$object;
			}, 250);
		};		


		$scope.customers = CustomersService.getList(params).$object;


		$scope.selectPage = function (pageNumber) {
			$scope.currentPage = pageNumber;
			params.options.skip = (($scope.currentPage - 1) * $scope.itemsPerPage);
			CustomersService.getList(params).then(function(customers) {
				$scope.customers = customers;
			});
		};


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

			modalInstance.result.then(function (customer) {
				$scope.alerts.push({type: 'success', msg: customer.name + ' has been updated!'});
			});

		};

		$scope.delete = function(customer) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/customers/customers-delete.html',
				controller: 'CustomersDeleteController',
				resolve: {
					customer: function () {
						return customer;
					}
				}
			});

			modalInstance.result.then(function () {
				$scope.alerts.push({type: 'success', msg: customer.name + ' has been deleted!'});
				$scope.selectPage($scope.currentPage);
			});

		};


		$scope.new = function(customer) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/customers/customers-edit.html',
				controller: 'CustomersNewController',
				resolve: {
					customers: function () {
						return $scope.customers;
					}
				}
			});

			modalInstance.result.then(function (customer) {
				$scope.alerts.push({type: 'success', msg: customer.name + ' has been created!'});
				$scope.selectPage($scope.currentPage);
			});

		};


		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};


	}])


	.controller('CustomersViewController', ['$scope', '$modalInstance', 'customer', function($scope, $modalInstance, customer) {

		$scope.customer = customer;
		$scope.close = function () {
			$modalInstance.close();
		};

	}])



	.controller('CustomersNewController', ['$scope', '$modalInstance', 'customers', function($scope, $modalInstance, customers) {

		$scope.customer = {};
		$scope.alerts = [];

		$scope.save = function () {

			customers.post($scope.customer)
				.then(function() {
					$modalInstance.close($scope.customer);
				}, function(e) {
					$scope.alerts.push({type: 'danger', msg: e.data.message});
				});

		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}])


	.controller('CustomersEditController', ['$scope', '$modalInstance', 'customer', function($scope, $modalInstance, customer) {

		$scope.customer = customer.clone();
		$scope.alerts = [];

		$scope.save = function () {

			$scope.customer.put()
				.then(function() {
					angular.copy($scope.customer, customer);
					$modalInstance.close($scope.customer);
				}, function(e) {
					$scope.alerts.push({type: 'danger', msg: e.data.message});
				});

		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};


		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}])


	.controller('CustomersDeleteController', ['$scope', '$modalInstance', 'customer', function($scope, $modalInstance, customer) {

		$scope.customer = customer;
		$scope.alerts = [];

		$scope.delete = function () {

			$scope.customer.remove()
				.then(function() {
					$modalInstance.close($scope.customer);
				}, function(e) {
					$scope.alerts.push({type: 'danger', msg: e.data.message});
				});

		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};


		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}]);
