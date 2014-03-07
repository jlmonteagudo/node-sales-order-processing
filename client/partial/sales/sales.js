
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
				$scope.alerts.push({type: 'success', msg: sale._id + ' has been created!'});
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

	}])


	.controller('SalesNewLineController', ['$scope', '$modalInstance', 'ProductsService', function($scope, $modalInstance, ProductsService) {

		$scope.line = {};
		$scope.productsSelectOptions = ProductsService.getOptionsForSelectWidget();

		$scope.save = function () {
			$scope.line.product.id = $scope.line.product._id;
			$modalInstance.close($scope.line);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};

	}]);


	/*
	.controller('SalesNewController', ['$scope', '$http', 'Restangular', 'SalesService', 'CustomersService', '$modal', '$timeout', function($scope, $http, Restangular, SalesService, CustomersService, $modal, $timeout) {

		$scope.customersSelectOptions = CustomersService.getOptionsForSelectWidget();

		$scope.$watch('customer', function(newValue, oldValue) {
			$scope.espia = newValue;
		});

	}]);
	*/






/*
	.controller('ProductsListController', ['$scope', '$http', 'ProductsService', '$modal', '$timeout', function($scope, $http, ProductsService, $modal, $timeout) {

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

		var getListProducts = function() {
			if (filterTimeout) { $timeout.cancel(filterTimeout); }
			filterTimeout = $timeout(function() {
				$scope.products = ProductsService.getList(params).$object;
			}, 250);
		}


		$scope.products = ProductsService.getList(params).$object;


		$scope.selectPage = function (pageNumber) {
			$scope.currentPage = pageNumber;
			params.options.skip = (($scope.currentPage - 1) * $scope.itemsPerPage);
			ProductsService.getList(params).then(function(products) {
				$scope.products = products;
			});
		};

		$scope.$watch('filters.description', function (val) {
			params.filters.description = val;
			getListProducts();
		});


		$scope.view = function(product) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/products/products-view.html',
				controller: 'ProductsViewController',
				resolve: {
					product: function () {
						return product;
					}
				}
			});
		};

		$scope.edit = function(product) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/products/products-edit.html',
				controller: 'ProductsEditController',
				resolve: {
					product: function () {
						return product;
					}
				}
			});

			modalInstance.result.then(function (product) {
				$scope.alerts.push({type: 'success', msg: product.description + ' has been updated!'});
			});

		};

		$scope.delete = function(product) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/products/products-delete.html',
				controller: 'ProductsDeleteController',
				resolve: {
					product: function () {
						return product;
					}
				}
			});

			modalInstance.result.then(function () {
				$scope.alerts.push({type: 'success', msg: product.description + ' has been deleted!'});
				$scope.selectPage($scope.currentPage);
			});

		};


		$scope.new = function(product) {

			var modalInstance = $modal.open({
				backdrop: 'static',
				windowClass: "modal fade in",
				templateUrl: 'partial/products/products-edit.html',
				controller: 'ProductsNewController',
				resolve: {
					products: function () {
						return $scope.products;
					}
				}
			});

			modalInstance.result.then(function (product) {
				$scope.alerts.push({type: 'success', msg: product.description + ' has been created!'});
				$scope.selectPage($scope.currentPage);
			});

		};


		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};


	}])


	.controller('ProductsViewController', ['$scope', '$modalInstance', 'product', function($scope, $modalInstance, product) {

		$scope.product = product;
		$scope.close = function () {
			$modalInstance.close();
		};

	}])



	.controller('ProductsNewController', ['$scope', '$modalInstance', 'products', function($scope, $modalInstance, products) {

		$scope.product = {};
		$scope.alerts = [];

		$scope.save = function () {

			products.post($scope.product)
				.then(function() {
					$modalInstance.close($scope.product);
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


	.controller('ProductsEditController', ['$scope', '$modalInstance', 'product', function($scope, $modalInstance, product) {

		$scope.product = product.clone();
		$scope.alerts = [];

		$scope.save = function () {

			$scope.product.put()
				.then(function() {
					angular.copy($scope.product, product);
					$modalInstance.close($scope.product);
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


	.controller('ProductsDeleteController', ['$scope', '$modalInstance', 'product', function($scope, $modalInstance, product) {

		$scope.product = product;
		$scope.alerts = [];

		$scope.delete = function () {

			$scope.product.remove()
				.then(function() {
					$modalInstance.close($scope.product);
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
*/
