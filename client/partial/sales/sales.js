
angular.module('sop.sales', ['ui.select2', 'sop.sales.services'])

	.constant('SalesStatesColors', {
		received: 'label-danger', 
		preparing: 'label-warning', 
		closed: 'label-success'
	})

	.controller('SalesListController', ['$scope', 'SalesService', '$modal', '$timeout', 'SalesStatesColors', function($scope, SalesService, $modal, $timeout, SalesStatesColors) {

		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		$scope.alerts = [];

		var params = {
			options: {
				skip: (($scope.currentPage - 1) * $scope.itemsPerPage),
				limit: $scope.itemsPerPage
			}
		};


		$scope.sales = SalesService.getList(params).$object;

		$scope.selectPage = function (pageNumber) {
			$scope.currentPage = pageNumber;
			params.options.skip = (($scope.currentPage - 1) * $scope.itemsPerPage);
			SalesService.getList(params).then(function(sales) {
				$scope.sales = sales;
			});
		};

		$scope.getStatusClass = function(sale) {
			return SalesStatesColors[sale.state];
		};


		$scope.view = function(sale) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/sales/sales-view.html',
				controller: 'SalesViewController',
				resolve: {
					sale: function () {
						return sale;
					}
				}
			});
		};


		$scope.edit = function(sale) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/sales/sales-edit.html',
				controller: 'SalesEditController',
				resolve: {
					sale: function () {
						return sale;
					}
				}
			});

			modalInstance.result.then(function (sale) {
				$scope.alerts.push({type: 'success', msg: sale._id + ' has been updated!'});
			});

		};


		$scope.delete = function(sale) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/sales/sales-delete.html',
				controller: 'SalesDeleteController',
				resolve: {
					sale: function () {
						return sale;
					}
				}
			});

			modalInstance.result.then(function () {
				$scope.alerts.push({type: 'success', msg: sale._id + ' has been deleted!'});
				$scope.selectPage($scope.currentPage);
			});

		};


		$scope.new = function(sale) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/sales/sales-new.html',
				controller: 'SalesNewController',
				resolve: {
					sales: function () {
						return $scope.sales;
					}
				}
			});

			modalInstance.result.then(function (sale) {
				$scope.alerts.push({type: 'success', msg: 'New sales order has been created!'});
				$scope.selectPage($scope.currentPage);
			});

		};


		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}])


	.controller('SalesViewController', ['$scope', '$modalInstance', 'sale', 'SalesStatesColors', function($scope, $modalInstance, sale, SalesStatesColors) {

		$scope.sale = sale;

		$scope.close = function () {
			$modalInstance.close();
		};

		$scope.getStatusClass = function(sale) {
			return SalesStatesColors[sale.state];
		};


	}])


	.controller('SalesEditController', ['$scope', '$modalInstance', 'sale', 'SalesService', function($scope, $modalInstance, sale, SalesService) {

		$scope.sale = sale.clone();
		$scope.alerts = [];

		$scope.save = function () {

			$scope.sale.state = $scope.sale.state.id;
			$scope.sale.put()
				.then(function() {
					angular.copy($scope.sale, sale);
					$modalInstance.close($scope.sale);
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

		$scope.statesSelectOptions = {
			data: SalesService.getSalesOrderStates()
		};

	}])


	.controller('SalesDeleteController', ['$scope', '$modalInstance', 'sale', function($scope, $modalInstance, sale) {

		$scope.sale = sale;
		$scope.alerts = [];

		$scope.delete = function () {

			$scope.sale.remove()
				.then(function() {
					$modalInstance.close($scope.sale);
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


	.controller('SalesNewController', ['$scope', '$modal', '$modalInstance', 'sales', 'CustomersService', function($scope, $modal, $modalInstance, sales, CustomersService) {

		$scope.sale = {};
		$scope.sale.lines = [];
		$scope.alerts = [];
		$scope.customersSelectOptions = CustomersService.getOptionsForSelectWidget();

		$scope.save = function () {

			$scope.sale.customer = $scope.sale.customer._id;
			$scope.sale.lines.forEach(function(line) {
				line.product = line.product._id;
			});

			sales.post($scope.sale)
				.then(function() {
					$modalInstance.close($scope.sale);
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

		$scope.newLine = function() {
			
			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/sales/sales-new-line.html',
				controller: 'SalesNewLineController'
			});

			modalInstance.result.then(function (line) {
				$scope.sale.lines.push(line);
			});

		};

		$scope.removeLine = function(index) {
			$scope.sale.lines.splice(index, 1);
		};
		

	}])


	.controller('SalesNewLineController', ['$scope', '$modalInstance', 'ProductsService', function($scope, $modalInstance, ProductsService) {

		$scope.line = {};
		$scope.alerts = [];
		$scope.productsSelectOptions = ProductsService.getOptionsForSelectWidget();

		$scope.$watch('line.product', function (val) {
			if (val === undefined) { return; }
			$scope.line.price = $scope.line.product.price;
		});

		$scope.save = function (isValid) {

			if (isValid) {
				$scope.line.product.id = $scope.line.product._id;
				$modalInstance.close($scope.line);				
			}
			else {
				$scope.alerts.push({type: 'danger', msg: 'Invalid data'});
			}

		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}]);

