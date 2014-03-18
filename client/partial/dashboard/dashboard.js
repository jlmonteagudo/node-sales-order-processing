
angular.module('sop.dashboard', ['sop.dashboard.services', 'angularCharts'])

	.controller('DashboardController', ['$scope', 'DashboardChartService', 'socketService', function($scope, DashboardChartService, socketService) {

		DashboardChartService.setupChart($scope);

		socketService.on('sales-order:create', function (ev, data) {
			DashboardChartService.setupChart($scope);
		});

	}]);
