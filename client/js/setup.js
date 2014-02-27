angular.module('sop', 
	['ui.bootstrap',
	'ui.utils',
	'ngRoute',
	'ngAnimate', 
	'restangular',
	'sop.customers',
	'sop.products',
	'sop.sales'
	]);

angular.module('sop').config(function($routeProvider) {

	$routeProvider.
	when('/home', {
		templateUrl: 'partial/home/home.html'
	}).
	when('/customers', {
		templateUrl: 'partial/customers/customers.html'
	}).
	when('/products', {
		templateUrl: 'partial/products/products.html'
	}).
	when('/sales', {
		templateUrl: 'partial/sales/sales.html'
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
			newResponse = response;
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


/*
// store the template cache url inside the template cache
angular.module('sop').run(['$templateCache', '$http', 'templateTextUrl', function($templateCache, $http, templateTextUrl) {
		if (templateTextUrl !== undefined && templateTextUrl.length > 0) {
			$http.get(templateTextUrl, {cache:$templateCache});
		}
	}
]);
*/
