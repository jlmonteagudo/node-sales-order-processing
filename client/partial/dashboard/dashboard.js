angular.module('sop.dashboard', ['sop.dashboard.services', 'angularCharts'])

	.controller('DashboardController', ['$scope', '$q', 'DateFormat', 'DashboardService', function($scope, $q, DateFormat, DashboardService) {

		$scope.prevMonth = moment().subtract('months', 1).format('MMM, YYYY');
		$scope.currentMonth = moment().format('MMM, YYYY');
		$scope.prevFromDate = moment().subtract('months', 1).date(1).format(DateFormat);
		$scope.prevToDate = moment().date(1).format(DateFormat);
		$scope.fromDate = moment().date(1).format(DateFormat);
		$scope.toDate = moment().add('days', 1).format(DateFormat);

		var setupChart = function() {

			$scope.chartType = "bar";

			$scope.chartConfig = {
				title : '',
				tooltips: true,
				labels : false,
				legend: {
					display: true,
					position: 'right'
				}
			};

			$scope.chartCountData = {
				'series': ['uno', 'dos'],
				'data': [
					{
						'y': [0, 0]
					}
				]
			};

			$scope.chartAmountData = {
				'series': ['uno', 'dos'],
				'data': [
					{
						'y': [0, 0]
					}
				]
			};

		};

		setupChart();


		DashboardService.getCountData($scope.prevFromDate, $scope.prevToDate, $scope.fromDate, $scope.toDate).then(function(data) {
			$scope.chartCountData = data;
		});

		DashboardService.getAmountData($scope.prevFromDate, $scope.prevToDate, $scope.fromDate, $scope.toDate).then(function(data) {
			$scope.chartAmountData = data;
		});






		//$scope.chartCountData = DashboardService.getCountData($scope.prevFromDate, $scope.prevToDate, $scope.fromDate, $scope.toDate);
		//$scope.chartAmountData = DashboardService.getAmountData($scope.prevFromDate, $scope.prevToDate, $scope.fromDate, $scope.toDate);


		/*



		// ***** PREVIOUS MONTH ****

		SalesService.getCountSales($scope.prevFromDate, $scope.prevToDate).then(function(count) {
			$scope.prevCount = count.count;
		});

		SalesService.getAmountSales($scope.prevFromDate, $scope.prevToDate).then(function(amount) {
			$scope.prevAmount = amount.amount;
		});


		// ***** CURRENT MONTH ****


		SalesService.getCountSales($scope.fromDate, $scope.toDate).then(function(count) {
			$scope.count = count.count;
		});

		SalesService.getAmountSales($scope.fromDate, $scope.toDate).then(function(amount) {
			$scope.amount = amount.amount;
		});





		// ***** CHART SETUP ****


		$scope.chartCountData = {
			"series": [$scope.prevMonth, $scope.currentMonth],
			"data": [
				{
					"y": [$scope.prevCount, $scope.count]
				}
			]
		};

		*/




	}]);



/*
	.controller('DashboardController', ['$scope', 'DateFormat', 'SalesService', function($scope, DateFormat, SalesService) {

		$scope.prevMonth = moment().subtract('months', 1).format('MMM, YYYY');
		$scope.currentMonth = moment().format('MMM, YYYY');


		// ***** PREVIOUS MONTH ****
		$scope.prevFromDate = moment().subtract('months', 1).date(1).format(DateFormat);
		$scope.prevToDate = moment().date(1).format(DateFormat);

		SalesService.getCountSales($scope.prevFromDate, $scope.prevToDate).then(function(count) {
			$scope.prevCount = count.count;
		});

		SalesService.getAmountSales($scope.prevFromDate, $scope.prevToDate).then(function(amount) {
			$scope.prevAmount = amount.amount;
		});


		// ***** CURRENT MONTH ****

		$scope.fromDate = moment().date(1).format(DateFormat);
		$scope.toDate = moment().add('days', 1).format(DateFormat);

		SalesService.getCountSales($scope.fromDate, $scope.toDate).then(function(count) {
			$scope.count = count.count;
		});

		SalesService.getAmountSales($scope.fromDate, $scope.toDate).then(function(amount) {
			$scope.amount = amount.amount;
		});





		// ***** CHART SETUP ****

		$scope.chartType = "bar";

		$scope.chartPrevConfig = {
			title : '',
			tooltips: true,
			labels : false,
			legend: {
				display: true,
				position: 'right'
			}
		};

		$scope.chartPrevData = {
			"series": [$scope.prevMonth, $scope.currentMonth],
			"data": [
				{
					"y": [$scope.prevCount, $scope.count]
				}
			]
		};




	}]);
*/