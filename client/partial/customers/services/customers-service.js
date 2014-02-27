
angular.module('sop.customers.services', [])


	.factory('CustomersService', ['Restangular', function(Restangular) {

		return {
			
			getList: function(params) {
				return Restangular.all('customers').getList(params);
			},

			get: function(id) {
				return Restangular.one('customers', id).get();
			},

			getOptionsForSelectWidget: function() {

				var options = {

					query: function (query) {

						var params = {};
						params.filters = {
							name: query.term
						};

						Restangular.all('customers').getList(params).then(function(customers) {
							var customersForSelect = customers.map(function(_customer){
								return {
									text: _customer.name,
									id: _customer._id
								};
							});

							return query.callback({ results: customersForSelect});
						});

					},

					initSelection: function(element, callback) {
						var id = $(element).val();

						if (id !== "") {
							Restangular.one('customers', id).get().then(function(_customer) {
								_customer.text = _customer.name;
								callback(_customer);
							});

						}

					}


				};

				return options;

			}



		};

	}]);
