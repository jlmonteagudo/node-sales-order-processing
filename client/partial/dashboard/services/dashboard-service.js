angular.module('sop.dashboard.services', [])

	.factory('DashboardService', ['SalesService', '$q', function(SalesService, $q) {

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
							'series': ['uno', 'dos'],
							'data': [
								{
									'y': data
								}
							]
						};

						//return countData;
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
							'series': ['uno', 'dos'],
							'data': [
								{
									'y': data
								}
							]
						};

						//return amountData;
						defer.resolve(amountData);


					});

				return defer.promise;

			}

		};

	}]);

