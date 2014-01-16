'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var ProductSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		min: 1,
		max: 9999
	}

});


mongoose.model('Product', ProductSchema);
