'use strict';

require('prototypes');

var log = require('./log');


var	modelsPath = [],
	routesPath = [];


exports.findArtifacts = function() {

	var wrench = require('wrench'),
		path = require('path'),
		files = wrench.readdirSyncRecursive(path.join(__dirname, '../lib'));


	log.info('Finding artifacts...');

	files.forEach(function(artifactPath) {
		if (artifactPath.endsWith('Model.js')) {
			modelsPath.push(artifactPath);
			log.info('found model ' + artifactPath);
		} else if (artifactPath.endsWith('Routes.js')) {
			routesPath.push(artifactPath);
			log.info('found route ' + artifactPath);
		}
	});

};

exports.modelsPath = modelsPath;

exports.routesPath = routesPath;
