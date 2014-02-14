angular.module('sop', 
	['ui.bootstrap',
	'ui.utils',
	'ngRoute',
	'ngAnimate', 
	'restangular',
	'sop.customers'
	]);

angular.module('sop').config(function($routeProvider) {

	$routeProvider.
	when('/home', {
		templateUrl: 'partial/home/home.html'
	}).
	when('/customers', {
		templateUrl: 'partial/customers/customers.html'
	}).
	/* Add New Routes Above */
	otherwise({redirectTo:'/home'});

});


angular.module('sop').config(function(RestangularProvider) {

	RestangularProvider.setBaseUrl('http://localhost:3000/api');

	RestangularProvider.setRestangularFields({
		id: "_id"
	});


	RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
		var newResponse;

		if (operation === "getList") {
			newResponse = response.results;
			newResponse.count = response.count;
		} else {
			newResponse = response.data;
		}
		
		return newResponse;
	});	

});


angular.module('sop').run(function($rootScope) {

	$rootScope.safeApply = function(fn) {
		var phase = $rootScope.$$phase;
		if (phase === '$apply' || phase === '$digest') {
			if (fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};

});
