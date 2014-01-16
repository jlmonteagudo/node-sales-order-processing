'use strict';

var app = require('express')(),
	server = require('http').createServer(app),
	io = require('./config/socket'),
	log = require('./config/log'),
	artifacts = require('./config/artifacts');


artifacts.findArtifacts();
require('./config/db/mongo');
require('./config/express')(app);
require('./config/routes')(app);
require('./lib/security/auth');


// Start server
var port = process.env.PORT || 3000;
server.listen(port, function () {
	log.info('Express server listening on port %d in %s mode', port, app.get('env'));
});

io.listen(server);
