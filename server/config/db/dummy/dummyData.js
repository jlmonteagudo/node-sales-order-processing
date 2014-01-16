'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Client = mongoose.model('Client'),
	AccessToken = mongoose.model('AccessToken'),
	RefreshToken = mongoose.model('RefreshToken'),
	Message = mongoose.model('Message'),
	Customer = mongoose.model('Customer'),
	Product = mongoose.model('Product'),
	SalesOrder = mongoose.model('SalesOrder'),
	log = require('../log'),
	Q = require('q');

User.find({}).remove(function() {
	User.create(
		{
			username: 'simeone',
			password: 'simeone',
			name : 'Diego',
			surname : 'Simeone',
			age: 40,
			email: 'cholo@atm.com'
		},
		{
			username: 'courtois',
			password: 'courtois',
			name : 'Thibaut',
			surname : 'Courtois',
			age: 21,
			email: 'courtois@atm.com'
		},
		{
			username: 'aranzubia',
			password: 'aranzubia',
			name : 'Daniel',
			surname : 'Aranzubia',
			age: 34,
			email: 'aranzubia@atm.com'
		},
		{
			username: 'godin',
			password: 'godin',
			name : 'Diego',
			surname : 'Godin',
			age: 27,
			email: 'godin@atm.com'
		},
		{
			username: 'filipe',
			password: 'filipe',
			name : 'Filipe Luis',
			surname : 'Kasmirski',
			age: 28,
			email: 'filipe@atm.com'
		},
		{
			username: 'juanfran',
			password: 'juanfran',
			name : 'Juanfran',
			surname : 'Torres',
			age: 28,
			email: 'juanfran@atm.com'
		},
		{
			username: 'miranda',
			password: 'miranda',
			name : 'Miranda',
			surname : 'Souza',
			age: 29,
			email: 'miranda@atm.com'
		},
		{
			username: 'tiago',
			password: 'tiago',
			name : 'Tiago',
			surname : 'Cardoso',
			age: 32,
			email: 'taigo@atm.com'
		},
		{
			username: 'mario',
			password: 'mario',
			name : 'Mario',
			surname : 'Suarez',
			age: 26,
			email: 'mario@atm.com'
		},
		{
			username: 'koke',
			password: 'koke',
			name : 'Koke',
			surname : 'Resurrecion',
			age: 21,
			email: 'koke@atm.com'
		},
		{
			username: 'gabi',
			password: 'gabi',
			name : 'Gabi',
			surname : 'Fernandez',
			age: 30,
			email: 'gabi@atm.com'
		},
		{
			username: 'arda',
			password: 'arda',
			name : 'Arda',
			surname : 'Turan',
			age: 26,
			email: 'arda@atm.com'
		},
		{
			username: 'oliver',
			password: 'oliver',
			name : 'Oliver',
			surname : 'Torres',
			age: 19,
			email: 'oliver@atm.com'
		},
		{
			username: 'adrian',
			password: 'adrian',
			name : 'Adrian',
			surname : 'Lopez',
			age: 25,
			email: 'adrian@atm.com'
		},
		{
			username: 'costa',
			password: 'costa',
			name : 'Diego',
			surname : 'Costa',
			age: 25,
			email: 'costa@atm.com'
		},
		{
			username: 'villa',
			password: 'villa',
			name : 'David',
			surname : 'Villa',
			age: 32,
			email: 'villa@atm.com'
		},
		{
			username: 'baptistao',
			password: 'baptistao',
			name : 'Leo',
			surname : 'Baptistao',
			age: 21,
			email: 'leo@atm.com'
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy users: ' + err);
				}
				else {
					log.info('Finished populating dummy users');
				}
			}
		);
});



Message.find({}).remove(function() {
	Message.create(
		{
			text : 'this is a dummy message'
		},
		{
			text : 'testing'
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy messages: ' + err);
				}
				else {
					log.info('Finished populating dummy messages');
				}
			}
		);
});



Customer.find({}).remove(function() {
	Customer.create(
		{
			name: 'Jose Luis Monteagudo',
			address: 'C/Cabo de Machichaco, 3',
			state: 'Castellon',
			country: 'Spain'
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy customers: ' + err);
				}
				else {
					log.info('Finished populating dummy customers');
				}
			}
		);
});



Product.find({}).remove(function() {
	Product.create(
		{
			description: 'Parachoques Delantero Ford Focus',
			address: 95
		},
		{
			description: 'Parachoques Trasero Ford Focus',
			address: 105
		},
		{
			description: 'Optica Derecha Ford Focus',
			address: 56
		},
		{
			description: 'Optica Izquierda Ford Focus',
			address: 56
		},
		{
			description: 'Parachoques Delantero Citroen C4',
			address: 95
		},
		{
			description: 'Parachoques Trasero Citroen C4',
			address: 105
		},
		{
			description: 'Optica Derecha Citroen C4',
			address: 56
		},
		{
			description: 'Optica Izquierda Citroen C4',
			address: 56
		},
		{
			description: 'Parachoques Delantero Citroen C3',
			address: 95
		},
		{
			description: 'Parachoques Trasero Citroen C3',
			address: 105
		},
		{
			description: 'Optica Derecha Citroen C3',
			address: 56
		},
		{
			description: 'Optica Izquierda Citroen C3',
			address: 56
		},
		{
			description: 'Parachoques Delantero Citroen C2',
			address: 95
		},
		{
			description: 'Parachoques Trasero Citroen C2',
			address: 105
		},
		{
			description: 'Optica Derecha Citroen C2',
			address: 56
		},
		{
			description: 'Optica Izquierda Citroen C2',
			address: 56
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy products: ' + err);
				}
				else {
					log.info('Finished populating dummy products');
				}
			}
		);
});


/* ++++++++++++++ Insert Sales Order ++++++++++++++++++ */

var foundCustomer,
	foundProduct;

var findCustomer = function() {
	var deferred = Q.defer();

	Customer.findOne({}, function (err, customer) {
		if (err) { deferred.reject(err); }
		deferred.resolve(customer);

		foundCustomer = customer;
		console.info('CUSTOMER: ' + JSON.stringify(customer));
	});

	return deferred.promise;
};

var findProduct = function() {
	var deferred = Q.defer();

	Product.findOne({}, function (err, product) {
		if (err) { deferred.reject(err); }
		deferred.resolve(product);

		foundProduct = product;
		console.info('PRODUCT: ' + JSON.stringify(product));
	});

	return deferred.promise;
};

var insertSalesOrder = function() {

	var deferred = Q.defer();


	SalesOrder.find({}).remove(function() {


		var salesOrder = new SalesOrder( {
			customer: foundCustomer,
			lines: [
				{
					product: foundProduct,
					quantity: 1,
					price: 13
				}
			]
		} );

		salesOrder.save(function(err, createdSalesOrder) {
			if (err) { deferred.reject(err); }
			deferred.resolve(createdSalesOrder);

			console.info('SALES ORDER: ' + JSON.stringify(createdSalesOrder));

		});

	});

	return deferred.promise;
};


var findSalesOrder = function() {
	var deferred = Q.defer();

	SalesOrder
		.findOne({})
		.populate('customer lines.product')
		.exec(function(err, salesOrder) {

			if (err) { deferred.reject(err); }
			deferred.resolve(salesOrder);

			log.info('salesOrder: ' + salesOrder);
			log.info('customer: ' + salesOrder.customer.name);
			log.info('product: ' + salesOrder.lines[0].product.description);

		});


	return deferred.promise;
};



setTimeout(function() {
	console.info('CREATING DUMMY SALES ORDER');

	findCustomer()
		.then(findProduct)
		.then(insertSalesOrder)
		.then(findSalesOrder)
		.done();

	console.info('END CREATING DUMMY SALES ORDER');

}, 1000);




/*

http://howtonodejs.blogspot.com.es/2013/05/understanding-q-deferred-in-nodejs.html
https://github.com/kriskowal/q

SalesOrder.find({}).remove(function() {
	SalesOrder.create(
		{
			customer: 'Jose Luis Monteagudo',
			address: 'C/Cabo de Machichaco, 3',
			state: 'Castellon',
			country: 'Spain'
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy customers: ' + err);
				}
				else {
					log.info('Finished populating dummy customers');
				}
			}
		);
});
*/



Client.remove({}, function() {
	var client = new Client({ name: 'Web Client', clientId: 'WebClient', clientSecret: 'WebClient' });
	client.save(function(err, client) {
		if(err) { return log.error(err); }
		else { log.info('New client - %s:%s',client.clientId,client.clientSecret); }
	});
});


AccessToken.remove({}, function (err) {
	if (err) { return log.error(err); }
});


RefreshToken.remove({}, function (err) {
	if (err) { return log.error(err); }
});

