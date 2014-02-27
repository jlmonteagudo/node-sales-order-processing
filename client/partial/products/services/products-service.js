
angular.module('sop.products.services', [])


	.factory('ProductsService', ['Restangular', function(Restangular) {

		return {
			
			getList: function(params) {
				return Restangular.all('products').getList(params);
			},

			get: function(id) {
				return Restangular.one('products', id).get();
			},

			getOptionsForSelectWidget: function() {

				var options = {

					query: function (query) {

						var params = {};
						params.filters = {
							description: query.term
						};

						Restangular.all('products').getList(params).then(function(products) {
							var productsForSelect = products.map(function(_product){
								return {
									text: _product.description,
									id: _product._id
								};
							});

							return query.callback({ results: productsForSelect});
						});

					},

					initSelection: function(element, callback) {
						var id = $(element).val();

						if (id !== "") {
							Restangular.one('products', id).get().then(function(_product) {
								_product.text = _product.description;
								callback(_product);
							});

						}

					}


				};

				return options;

			}



		};

	}]);
