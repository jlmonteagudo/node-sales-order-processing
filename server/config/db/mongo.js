'use strict';

require('prototypes');

var mongoose = require('mongoose'),
	config = require('../config')[process.env.NODE_ENV],
	log = require('../log'),
	uristring =	process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.db,
	mongoOptions = { db: { safe: true } },
	artifacts = require('../artifacts'),
	path = require('path');


var loadModels = function() {

	log.info('Loading models...');

	artifacts.modelsPath.forEach(function(modelPath) {
		require(path.join('../../lib/', modelPath));
		log.info('%s loaded', modelPath);
	});

	log.info('Models loaded\n');

};

var createDummyUsers = function() {
	log.info('Loading dummy data...');
	require('./dummy');
};


var setupMongoose = function() {

	var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
	mongoose.plugin( function (schema) {
		schema.statics.isObjectId = function(id) {
			if (id) { return checkForHexRegExp.test(id); }
			return false;
		};
	});
};


setupMongoose();
loadModels();

mongoose.connect(uristring, mongoOptions, function (err) {

	if (err) {
		log.error('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		log.info('Successfully connected to: ' + uristring);
		createDummyUsers();
	}

});


