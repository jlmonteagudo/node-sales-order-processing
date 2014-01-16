'use strict';

var config = require('../../config/config'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
	BearerStrategy = require('passport-http-bearer').Strategy,
	User = mongoose.model('User'),
	Client = mongoose.model('Client'),
	AccessToken = mongoose.model('AccessToken');


passport.use(new BasicStrategy(
	function(username, password, done) {
		Client.findOne({ clientId: username }, function(err, client) {
			if (err) { return done(err); }
			if (!client) { return done(null, false); }
			if (client.clientSecret !== password) { return done(null, false); }

			return done(null, client);
		});
	}
));

passport.use(new ClientPasswordStrategy(
	function(clientId, clientSecret, done) {
		Client.findOne({ clientId: clientId }, function(err, client) {
			if (err) { return done(err); }
			if (!client) { return done(null, false); }
			if (client.clientSecret !== clientSecret) { return done(null, false); }

			return done(null, client);
		});
	}
));

passport.use(new BearerStrategy(
	function(accessToken, done) {
		AccessToken.findOne({ token: accessToken }, function(err, token) {
			if (err) { return done(err); }
			if (!token) { return done(null, false); }

			if( Math.round((Date.now()-token.created)/1000) > config.tokenLife ) {
				AccessToken.remove({ token: accessToken }, function (err) {
					if (err) { return done(err); }
				});
				return done(null, false, { message: 'Token expired' });
			}

			User.findById(token.userId, function(err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message: 'Unknown user' }); }

				var info = { scope: '*' };
				done(null, user, info);
			});
		});
	}
));
