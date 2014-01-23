'use strict';

angular.module('sop', ['sop.customers'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomersController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
