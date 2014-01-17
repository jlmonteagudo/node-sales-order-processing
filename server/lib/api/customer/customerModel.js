'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var CustomerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	address:  {
		type: String,
		required: true
	},
	state:  {
		type: String,
		required: true
	},
	country:  {
		type: String,
		required: true
	}
});

mongoose.model('Customer', CustomerSchema);
