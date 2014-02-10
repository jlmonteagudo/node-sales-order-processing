'use strict';

var userController = require('./userController');
//var passport = require('passport');

module.exports = function (app) {

	//SECURE route
	//app.get('/api/users/:userId', passport.authenticate('bearer', { session: false }), userController.findById);
	
	app.get('/api/users/:userId', userController.findById);
	app.get('/api/users', userController.list);
	app.put('/api/users', userController.list);
	app.put('/api/users/:userId', userController.update);
	app.post('/api/users', userController.create);
	app.del('/api/users/:userId', userController.delete);

	app.param('userId', userController.load);

};
