'use strict';

require('prototypes');

var	log = require('./log'),
	oauth2 = require('../lib/security/oauth2');


function loadRoutes(app) {

	var arfifacts = require('./artifacts'),
		path = require('path');

	log.info('Loading routes...');

	arfifacts.routesPath.forEach(function(routePath) {
		require(path.join('../lib/', routePath))(app);
		log.info('%s loaded', routePath);
	});

	log.info('Routes loaded');

}

function existModel(req, res, next) {

	var baseRoutesModel = require('../lib/base/baseRoutesModel');

	if (!baseRoutesModel.hasOwnProperty(req.params.model)) {
		res.json(404, {'code': 'collection-not-found', 'message' : 'Collection Not Found'});
	}
	else {
		next();
	}

}


function loadDefaultRoutesModel(app) {

	var baseController = require('../lib/base/baseController');

	app.get('/api/:model/:modelId', existModel, baseController.findById);
	app.get('/api/:model', existModel, baseController.list);
	app.put('/api/:model/:modelId', existModel, baseController.update);
	app.post('/api/:model', existModel, baseController.create);
	app.del('/api/:model/:modelId', existModel, baseController.delete);

	app.param('modelId', baseController.load);

}


function loadSecurityRoutes(app) {
	log.info('Loading security routes...');
	app.post('/oauth/token', oauth2.token);
	app.get('/oauth/token', function(req, res) {
		res.send('get token');
	});
	log.info('Loaded security routes');
}


module.exports = function (app) {
	loadRoutes(app);
	loadDefaultRoutesModel(app);
	loadSecurityRoutes(app);
};

