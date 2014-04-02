
angular.module('sop.products', ['sop.products.services'])

	.controller('ProductsListController', ['$scope', 'ProductsService', '$modal', '$timeout', function($scope, ProductsService, $modal, $timeout) {

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
				description: $scope.filters.description
			};
		};


		$scope.getListProducts = function() {
			if (filterTimeout) { $timeout.cancel(filterTimeout); }
			filterTimeout = $timeout(function() {
				params.filters = getParamsFilters();
				$scope.products = ProductsService.getList(params).$object;
			}, 250);
		};


		$scope.products = ProductsService.getList(params).$object;


		$scope.selectPage = function (pageNumber) {
			$scope.currentPage = pageNumber;
			params.options.skip = (($scope.currentPage - 1) * $scope.itemsPerPage);
			ProductsService.getList(params).then(function(products) {
				$scope.products = products;
			});
		};


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
