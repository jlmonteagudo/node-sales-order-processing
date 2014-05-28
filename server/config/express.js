'use strict';

var express = require('express'),
	path = require('path'),
	passport = require('passport'),
	cors = require('cors');


module.exports = function (app) {

	app.configure('development', function() {
		//development configuration
	});

	app.configure('production', function() {
		app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
	});

	app.configure(function() {

		app.use(express.static(path.join(__dirname, '../public')));
		app.set('views', __dirname + '/views');
		app.set('view engine', 'html');
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(passport.initialize());
		app.use(express.methodOverride());
		app.use(cors());
		app.use(app.router);
		app.options('*', cors());

	});

};
