'use strict';

var mongoose = require('mongoose'),
	socket = require('../../config/socket'),
	User = mongoose.model('User'),
	_ = require('lodash');


var LIMIT_ROWS_DEFAULT = 10,
	LIMIT_ROWS = 100;

exports.load = function(req, res, next, id) {

	try {

		if (!User.isObjectId(id)) { throw new Error(); }

		User.findById(id, function (err, user) {
			if (err) { throw new Error(); }
			req.userModel = user;
			next();
		});
	}
	catch (err) {
		res.json(404, {'code': 'not-found', 'message' : 'Not Found'});
	}

};


exports.findById = function(req, res) {
	res.json(req.userModel);
};

exports.list = function(req, res) {

	var conditions, fields, options;

	try {

		conditions = req.query.conditions ? JSON.parse(req.query.conditions) : null;
		fields = req.query.fields ? JSON.parse(req.query.fields) : null;
		options = req.query.options ? JSON.parse(req.query.options) : {};

		if (!options.limit) { options.limit = LIMIT_ROWS_DEFAULT; }
		if (options.limit > LIMIT_ROWS) { options.limit = LIMIT_ROWS; }

		User.find(conditions, fields, options, function (err, users) {
			if (err) { throw new Error(); }
			res.json(users);
		});

	}
	catch (err) {
		res.json(400, {'code': 'list-error', 'message' : err.message});
	}

};


exports.update = function(req, res) {

	var user = req.userModel;

	user = _.extend(user, req.body);
	user.save(function (err, user) {
		if (err) { res.json(400, {'code': 'update-error', 'message' : err.message}); }
		else {
			res.json(user);
			socket.io.sockets.emit(req.params.model + ':update');
		}
	});

};


exports.create = function(req, res) {

	var user = new User(req.body);

	user.save(function (err, user) {
		if (err) { res.json(400, {'code': 'create-error', 'message' : err.message}); }
		else {
			res.json(user);
			socket.io.sockets.emit(req.params.model + ':create');
		}
	});

};


exports.delete = function(req, res) {

	var user = req.userModel;

	user.remove(function (err, user) {
		if (err) { res.json(400, {'code': 'delete-error', 'message' : err.message}); }
		else {
			res.json(user);
			socket.io.sockets.emit(req.params.model + ':delete');
		}
	});
	
};

