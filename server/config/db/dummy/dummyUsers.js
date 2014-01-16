'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Client = mongoose.model('Client'),
	AccessToken = mongoose.model('AccessToken'),
	RefreshToken = mongoose.model('RefreshToken'),
	log = require('../../log');

User.find({}).remove(function() {
	User.create(
		{
			username: 'simeone',
			password: 'simeone',
			name : 'Diego',
			surname : 'Simeone',
			age: 40,
			email: 'cholo@atm.com'
		},
		{
			username: 'courtois',
			password: 'courtois',
			name : 'Thibaut',
			surname : 'Courtois',
			age: 21,
			email: 'courtois@atm.com'
		},
		{
			username: 'aranzubia',
			password: 'aranzubia',
			name : 'Daniel',
			surname : 'Aranzubia',
			age: 34,
			email: 'aranzubia@atm.com'
		},
		{
			username: 'godin',
			password: 'godin',
			name : 'Diego',
			surname : 'Godin',
			age: 27,
			email: 'godin@atm.com'
		},
		{
			username: 'filipe',
			password: 'filipe',
			name : 'Filipe Luis',
			surname : 'Kasmirski',
			age: 28,
			email: 'filipe@atm.com'
		},
		{
			username: 'juanfran',
			password: 'juanfran',
			name : 'Juanfran',
			surname : 'Torres',
			age: 28,
			email: 'juanfran@atm.com'
		},
		{
			username: 'miranda',
			password: 'miranda',
			name : 'Miranda',
			surname : 'Souza',
			age: 29,
			email: 'miranda@atm.com'
		},
		{
			username: 'tiago',
			password: 'tiago',
			name : 'Tiago',
			surname : 'Cardoso',
			age: 32,
			email: 'taigo@atm.com'
		},
		{
			username: 'mario',
			password: 'mario',
			name : 'Mario',
			surname : 'Suarez',
			age: 26,
			email: 'mario@atm.com'
		},
		{
			username: 'koke',
			password: 'koke',
			name : 'Koke',
			surname : 'Resurrecion',
			age: 21,
			email: 'koke@atm.com'
		},
		{
			username: 'gabi',
			password: 'gabi',
			name : 'Gabi',
			surname : 'Fernandez',
			age: 30,
			email: 'gabi@atm.com'
		},
		{
			username: 'arda',
			password: 'arda',
			name : 'Arda',
			surname : 'Turan',
			age: 26,
			email: 'arda@atm.com'
		},
		{
			username: 'oliver',
			password: 'oliver',
			name : 'Oliver',
			surname : 'Torres',
			age: 19,
			email: 'oliver@atm.com'
		},
		{
			username: 'adrian',
			password: 'adrian',
			name : 'Adrian',
			surname : 'Lopez',
			age: 25,
			email: 'adrian@atm.com'
		},
		{
			username: 'costa',
			password: 'costa',
			name : 'Diego',
			surname : 'Costa',
			age: 25,
			email: 'costa@atm.com'
		},
		{
			username: 'villa',
			password: 'villa',
			name : 'David',
			surname : 'Villa',
			age: 32,
			email: 'villa@atm.com'
		},
		{
			username: 'baptistao',
			password: 'baptistao',
			name : 'Leo',
			surname : 'Baptistao',
			age: 21,
			email: 'leo@atm.com'
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy users: ' + err);
				}
				else {
					log.info('Finished populating dummy users');
				}
			}
		);
});



Client.remove({}, function() {
	var client = new Client({ name: 'Web Client', clientId: 'WebClient', clientSecret: 'WebClient' });
	client.save(function(err, client) {
		if(err) { return log.error(err); }
		else { log.info('New client - %s:%s',client.clientId,client.clientSecret); }
	});
});


AccessToken.remove({}, function (err) {
	if (err) { return log.error(err); }
});


RefreshToken.remove({}, function (err) {
	if (err) { return log.error(err); }
});

