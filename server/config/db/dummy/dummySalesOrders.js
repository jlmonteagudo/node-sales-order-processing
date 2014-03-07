'use strict';

var mongoose = require('mongoose'),
	Customer = mongoose.model('Customer'),
	Product = mongoose.model('Product'),
	SalesOrder = mongoose.model('SalesOrder'),
	log = require('../../log'),
	Q = require('q');



var createCustomers = function() {
	var deferred = Q.defer();

	Customer.find({}).remove(function() {
		Customer.create(
			{
				name: 'Jose Luis Monteagudo',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Diego Simeone',
				address: 'C/Cabo de Gata, 3',
				state: 'Valencia',
				country: 'Spain'
			},

			{
				name: 'Thibaut Courtois',
				address: 'C/Sagunto, 5',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Daniel Aranzubia',
				address: 'C/Paterna',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Diego Godin',
				address: 'C/Machichaco, 3',
				state: 'Bilbao',
				country: 'Spain'
			},

			{
				name: 'Filipe Luis Kasmirski',
				address: 'C/Historiador Viciano, 13',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Juanfran Torres',
				address: 'C/Cabo Malaga, 3',
				state: 'Cadiz',
				country: 'Spain'
			},

			{
				name: 'Miranda Souza',
				address: 'C/Escultor Viciano, 23',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Tiago Cardoso',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Mario Suarez',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Koke Resurrecion',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Gabi Fernandez',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Arda Turan',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Oliver Torres',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Adrian Lopez',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'Diego Costa',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},

			{
				name: 'David Villa',
				address: 'C/Cabo de Machichaco, 3',
				state: 'Castellon',
				country: 'Spain'
			},
																								
			function(err, customer) {
				if (err) {
					log.error('Error loading dummy customers: ' + err);
					deferred.reject(err);
				}
				else {
					log.info('Finished populating dummy customers');
					deferred.resolve(customer);
				}
			}
		);
	});

	return deferred.promise;

};

var createProducts = function() {
	var deferred = Q.defer();

	Product.find({}).remove(function() {
		Product.create(
			{
				description: 'Parachoques Delantero Ford Focus',
				price: 95
			},
			{
				description: 'Parachoques Trasero Ford Focus',
				price: 105
			},
			{
				description: 'Optica Derecha Ford Focus',
				price: 56.98
			},
			{
				description: 'Optica Izquierda Ford Focus',
				price: 56
			},
			{
				description: 'Parachoques Delantero Citroen C4',
				price: 95
			},
			{
				description: 'Parachoques Trasero Citroen C4',
				price: 105
			},
			{
				description: 'Optica Derecha Citroen C4',
				price: 56
			},
			{
				description: 'Optica Izquierda Citroen C4',
				price: 56.99
			},
			{
				description: 'Parachoques Delantero Citroen C3',
				price: 95
			},
			{
				description: 'Parachoques Trasero Citroen C3',
				price: 105
			},
			{
				description: 'Optica Derecha Citroen C3',
				price: 56
			},
			{
				description: 'Optica Izquierda Citroen C3',
				price: 56
			},
			{
				description: 'Parachoques Delantero Citroen C2',
				price: 95
			},
			{
				description: 'Parachoques Trasero Citroen C2',
				price: 105
			},
			{
				description: 'Optica Derecha Citroen C2',
				price: 56
			},
			{
				description: 'Optica Izquierda Citroen C2',
				price: 56
			},
			function(err, product) {
				if (err) {
					log.error('Error loading dummy products: ' + err);
					deferred.reject(err);
				}
				else {
					log.info('Finished populating dummy products');
					deferred.resolve(product);
				}
			}
		);
	});

	return deferred.promise;

};


var getSalesOrderToCreate = function(state, customer, product, quantity, price) {

	var salesOrder = new SalesOrder( {
		state: state,
		customer: customer,
		lines: [
			{
				product: product,
				quantity: quantity,
				price: price
			},
			{
				product: product,
				quantity: (quantity + 1),
				price: (price * 2)
			}
		]
	} );

	return salesOrder;

};


var createSalesOrders = function(params) {

	var customer = params[0],
		product = params[1],
		deferred = Q.defer();

	SalesOrder.find({}).remove(function() {

		var salesOrder = getSalesOrderToCreate('received', customer, product, 1, 13);
		salesOrder.save();

		salesOrder = getSalesOrderToCreate('preparing', customer, product, 1, 5);
		salesOrder.save();

		salesOrder = getSalesOrderToCreate('closed', customer, product, 2, 50);
		salesOrder.save(function(err, createdSalesOrder) {
			if (err) { deferred.reject(err); }
			
			log.info('Finished populating dummy sales orders');
			deferred.resolve(createdSalesOrder);
		});


	});

	return deferred.promise;

};


var findSalesOrder = function() {

	SalesOrder
		.findOne({})
		.populate('customer lines.product')
		.exec(function(err, salesOrder) {

			if (err) { log.error(err); }
			log.info('SalesOrder created: ' + salesOrder);
			//log.info('customer: ' + salesOrder.customer.name);
			//log.info('product: ' + salesOrder.lines[0].product.description);

		});

};



Q.all([createCustomers(), createProducts()])
	.then(createSalesOrders)
	.then(findSalesOrder)
	.done();



