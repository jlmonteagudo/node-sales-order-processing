'use strict';

var mongoose = require('mongoose'),
	socket = require('../../config/socket'),
	baseRoutesModel = require('./baseRoutesModel'),
	_ = require('lodash');


var LIMIT_ROWS_DEFAULT = 10,
	LIMIT_ROWS = 100;


var getModel = function (routeModel) {
	return mongoose.model(baseRoutesModel[routeModel]);
};

exports.load = function(req, res, next, id) {

	try {

		var Model = getModel(req.params.model);

		if (!Model.isObjectId(id)) { throw new Error(); }

		Model.findById(id, function (err, model) {
			if (err) { throw new Error(); }
			req.model = model;
			next();
		});
	}
	catch (err) {
		res.json(404, {'code': 'not-found', 'message' : 'Not Found'});
	}


};


exports.findById = function(req, res) {
	res.json(req.model);
};



exports.list = function(req, res) {

	var conditions, fields, options, filters;
	var responseData = {};

	try {

		var Model = getModel(req.params.model);

		conditions = req.query.conditions ? JSON.parse(req.query.conditions) : {};
		fields = req.query.fields ? JSON.parse(req.query.fields) : {};
		options = req.query.options ? JSON.parse(req.query.options) : {};
		filters = req.query.filters ? JSON.parse(req.query.filters) : {};

		if (!options.limit) { options.limit = LIMIT_ROWS_DEFAULT; }
		if (options.limit > LIMIT_ROWS) { options.limit = LIMIT_ROWS; }

		_.forOwn(filters, function(value, key) {
			conditions[key] = {$regex: value, $options: 'i'};
		});


		Model.count(conditions, function(err, count) {
			if (err) { console.log(err.message); }

			responseData.count = count;
			Model.find(conditions, fields, options, function (err, models) {
				if (err) { throw new Error(err.message); }
				responseData.results = models;
				res.json(responseData);
			});

		});


	}
	catch (err) {
		console.log(err.message);
		res.json(400, {'code': 'list-error', 'message' : err.message});
	}

};



exports.update = function(req, res) {

	var model = req.model;

	model = _.extend(model, req.body);
	model.save(function (err, model) {
		if (err) { res.json(400, {'code': 'update-error', 'message' : err.message}); }
		else {
			res.json(model);
			socket.io.sockets.emit(req.params.model + ':update');
		}
	});

};


exports.create = function(req, res) {

	var Model = getModel(req.params.model);
	var model = new Model(req.body);

	model.save(function (err, model) {
		if (err) { res.json(400, {'code': 'create-error', 'message' : err.message}); }
		else {
			res.json(model);
			socket.io.sockets.emit(req.params.model + ':create');
		}
	});

};


exports.delete = function(req, res) {

	var model = req.model;

	model.remove(function (err, model) {
		if (err) { res.json(400, {'code': 'delete-error', 'message' : err.message}); }
		else {
			res.json(model);
			socket.io.sockets.emit(req.params.model + ':delete');
		}
	});
	
};

