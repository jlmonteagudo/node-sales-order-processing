'use strict';

var mongoose = require('mongoose'),
	Message = mongoose.model('Message'),
	log = require('../../log');


Message.find({}).remove(function() {
	Message.create(
		{
			text : 'this is a dummy message'
		},
		{
			text : 'testing'
		},
		function(err) {
				if (err) {
					log.error('Error loading dummy messages: ' + err);
				}
				else {
					log.info('Finished populating dummy messages');
				}
			}
		);
});



