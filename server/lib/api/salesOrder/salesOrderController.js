'use strict';

var mongoose = require('mongoose'),
	socket = require('../../../config/socket'),
	SalesOrder = mongoose.model('SalesOrder'),
	_ = require('lodash');


var LIMIT_ROWS_DEFAULT = 10,
	LIMIT_ROWS = 100;

exports.load = function(req, res, next, id) {

	try {

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


exports.count = function(req, res) {
	var fromDate = new Date(req.query.fromDate);
	var toDate = new Date(req.query.toDate);

	SalesOrder.count({ created : { $gte: fromDate, $lte: toDate } }, function(err, count) {
		res.json({count: count});
	});


};


exports.amount = function(req, res) {
	var fromDate = new Date(req.query.fromDate);
	var toDate = new Date(req.query.toDate);
	var amount = 0;
	var query =
		[
			{
				$match: {
					created: {
						$gte: fromDate,
						$lte: toDate
					}
				}
			},

			{
				$unwind: '$lines'
			},

			{
				$group: {
					_id: 0,
					totalAmount: { $sum: { $multiply : ['$lines.quantity', '$lines.price'] } }
				}
			}
		];

	SalesOrder.aggregate( query, function(err, data) {
		if (err) { throw err; }
		if (data.length) { amount = data[0].totalAmount; }
		res.json({amount: amount});
	});

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
			socket.io.sockets.emit('sales-order:update');
		}
	});

};


exports.create = function(req, res) {

	var salesOrder = new SalesOrder(req.body);
	salesOrder.save(function (err, salesOrder) {
		if (err) { res.json(400, {'code': 'create-error', 'message' : err.message}); }
		else {
			res.json(salesOrder);
			socket.io.sockets.emit('sales-order:create');
		}
	});

};


exports.delete = function(req, res) {

	var salesOrder = req.salesOrderModel;

	salesOrder.remove(function (err, salesOrder) {
		if (err) { res.json(400, {'code': 'delete-error', 'message' : err.message}); }
		else {
			res.json(salesOrder);
			socket.io.sockets.emit('sales-order:delete');
		}
	});
	
};

