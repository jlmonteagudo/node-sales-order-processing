'use strict';

var mongoose = require('mongoose'),
	socket = require('../../../config/socket'),
	SalesOrder = mongoose.model('SalesOrder'),
	_ = require('lodash');


var LIMIT_ROWS_DEFAULT = 10,
	LIMIT_ROWS = 100;

exports.load = function(req, res, next, id) {

	try {

		//if (!SalesOrder.isObjectId(id)) { throw new Error(); }

		/*
		SalesOrder.findById(id, function (err, salesOrder) {
			if (err) { throw new Error(); }
			req.salesOrderModel = salesOrder;
			next();
		});
		*/

		SalesOrder.findById(id)
			.populate('customer lines.product')
			.exec(function(err, salesOrder) {
				if (err) { throw err; }
				req.salesOrderModel = salesOrder;
				next();
			});

	}
	catch (err) {
		res.json(404, {'code': 'not-found', 'message' : 'Not Found'});
	}

};


exports.findById = function(req, res) {
	res.json(req.salesOrderModel);
};

exports.list = function(req, res) {

	var conditions, fields, options, filters, responseData;

	try {

		conditions = req.query.conditions ? JSON.parse(req.query.conditions) : {};
		fields = req.query.fields ? JSON.parse(req.query.fields) : {};
		options = req.query.options ? JSON.parse(req.query.options) : {};
		filters = req.query.filters ? JSON.parse(req.query.filters) : {};
		responseData = {};

		if (!options.limit) { options.limit = LIMIT_ROWS_DEFAULT; }
		if (options.limit > LIMIT_ROWS) { options.limit = LIMIT_ROWS; }

		_.forOwn(filters, function(value, key) {
			conditions[key] = {$regex: value, $options: 'i'};
		});


		SalesOrder.count(function(err, count) {
			if (err) { throw err; }

			responseData.count = count;

			/*
			SalesOrder.find(conditions, fields, options, function (err, salesOrders) {
				if (err) { throw err; }
				responseData.results = salesOrders;
				res.json(responseData);
			});
			*/

			SalesOrder.find(conditions, fields, options)
				.populate('customer lines.product')
				.exec(function(err, salesOrders) {
					if (err) { throw err; }
					responseData.results = salesOrders;
					res.json(responseData);
				});

		});

	}
	catch (err) {
		res.json(400, {'code': 'list-error', 'message' : err.message});
	}

};


exports.update = function(req, res) {

	var salesOrder = req.salesOrderModel;
	salesOrder = _.extend(salesOrder, req.body);
	salesOrder.save(function (err, salesOrder) {
		if (err) { res.json(400, {'code': 'update-error', 'message' : err.message}); }
		else {
			res.json(salesOrder);
			socket.io.sockets.emit(req.params.model + ':update');
		}
	});

};


exports.create = function(req, res) {

	var salesOrder = new SalesOrder(req.body);
	salesOrder.save(function (err, salesOrder) {
		if (err) { res.json(400, {'code': 'create-error', 'message' : err.message}); }
		else {
			res.json(salesOrder);
			socket.io.sockets.emit(req.params.model + ':create');
		}
	});

};


exports.delete = function(req, res) {

	var salesOrder = req.salesOrderModel;

	salesOrder.remove(function (err, salesOrder) {
		if (err) { res.json(400, {'code': 'delete-error', 'message' : err.message}); }
		else {
			res.json(salesOrder);
			socket.io.sockets.emit(req.params.model + ':delete');
		}
	});
	
};

