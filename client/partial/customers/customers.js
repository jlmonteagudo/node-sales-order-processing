angular.module('sop.customers', [])

	.controller('CustomersController', ['$scope', '$http', 'Restangular', '$modal', function($scope, $http, Restangular, $modal) {

		var apiCustomers = Restangular.all('customers');
		var params = 
		{
			conditions: {
				
			},

			filters: {
				name: ''
			},

			options: {
				skip: (($scope.currentPage - 1) * $scope.maxSize),
				limit: 5
			}
		};



		$scope.totalItems = 17;
		$scope.currentPage = 1;
		$scope.maxSize = 5;

		$scope.selectPage = function (pageNumber) {
			$scope.currentPage = pageNumber;
			$scope.customers = apiCustomers.getList(params).$object;
		};


		$scope.$watch('filters.name', function (val) {
		 	params.filters.name = val;
			$scope.customers = apiCustomers.getList(params).$object;
		 });


		$scope.customers = apiCustomers.getList(params).$object;

		$scope.view = function(customer) {


			var modalInstance = $modal.open({
				windowClass: "modal fade in",
				templateUrl: 'customers-view.html',
				controller: CustomersViewController,
				resolve: {
					customer: function () {
						return customer;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
      			$scope.selected = selectedItem;
    		}, function () {
      			$log.info('Modal dismissed at: ' + new Date());
    		});

		}



	}]);

	var CustomersViewController = function($scope, $modalInstance, customer) {

		$scope.customer = customer;

		$scope.ok = function () {
			$modalInstance.close(customer);
		};

	}

	/*
	.controller('CustomersViewController', ['$scope', 'customer', function($scope, customer) {

		$scope.customer = customer;

	}]);
*/
	