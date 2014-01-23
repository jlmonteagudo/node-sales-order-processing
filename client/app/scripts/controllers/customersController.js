'use strict';

angular.module('sop.customers', [])
	.controller('CustomersController', ['$scope', '$http', function ($scope, $http) {

 		$http.get('http://localhost:3000/api/users').success(function(data) {
    		$scope.customers = data;
  		});

	}]);
