angular.module('sop.dashboard.services', [])

	.factory('DashboardService', ['SalesService', '$q', 'DateFormat', function(SalesService, $q, DateFormat) {

		return {
			
			getCountData: function(prevFromDate, prevToDate, fromDate, toDate) {

				var defer = $q.defer();

				$q.all([
						SalesService.getCountSales(prevFromDate, prevToDate),
						SalesService.getCountSales(fromDate, toDate)
					])
					.then(function(values) {

						var data = values.map(function(element) {
							return element.count;
						});

						var countData = {
							'series': [moment(prevFromDate).format(DateFormat.monthAndYear), moment(fromDate).format(DateFormat.monthAndYear)],
							'data': [
								{
									'y': data
								}
							]
						};

						defer.resolve(countData);

					});

				return defer.promise;

			},

			getAmountData: function(prevFromDate, prevToDate, fromDate, toDate) {

				var defer = $q.defer();

				$q.all([
						SalesService.getAmountSales(prevFromDate, prevToDate),
						SalesService.getAmountSales(fromDate, toDate)
					])
					.then(function(values) {

						var data = values.map(function(element) {
							return element.amount;
						});

						var amountData = {
							'series': [moment(prevFromDate).format(DateFormat.monthAndYear), moment(fromDate).format(DateFormat.monthAndYear)],
							'data': [
								{
									'y': data
								}
							]
						};

						defer.resolve(amountData);


					});

				return defer.promise;

			}

		};

	}])


	.factory('DashboardChartService', ['DashboardService', 'DateFormat', function(DashboardService, DateFormat) {

		return {
			
			setupChart: function($scope) {

				$scope.prevMonth = moment().subtract('months', 1).format(DateFormat.monthAndYear);
				$scope.currentMonth = moment().format(DateFormat.monthAndYear);
				$scope.prevFromDate = moment().subtract('months', 1).date(1).format(DateFormat.standar);
				$scope.prevToDate = moment().date(1).format(DateFormat.standar);
				$scope.fromDate = moment().date(1).format(DateFormat.standar);
				$scope.toDate = moment().add('days', 1).format(DateFormat.standar);


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
					'series': ['', ''],
					'data': [
						{
							'y': [0, 0]
						}
					]
				};

				$scope.chartAmountData = {
					'series': ['', ''],
					'data': [
						{
							'y': [0, 0]
						}
					]
				};


				DashboardService.getCountData($scope.prevFromDate, $scope.prevToDate, $scope.fromDate, $scope.toDate).then(function(data) {
					$scope.chartCountData = data;
					$scope.prevCount = data.data[0].y[0];
					$scope.count = data.data[0].y[1];
				});

				DashboardService.getAmountData($scope.prevFromDate, $scope.prevToDate, $scope.fromDate, $scope.toDate).then(function(data) {
					$scope.chartAmountData = data;
					$scope.prevAmount = data.data[0].y[0];
					$scope.amount = data.data[0].y[1];
				});


			}

		};

	}]);


