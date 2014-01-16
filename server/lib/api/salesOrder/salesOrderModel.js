'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SalesOrderSchema = new Schema({
	created: { type: Date, default: Date.now },
	customer: { type: Schema.Types.ObjectId, ref: 'Customer'},
	lines: [{
		product: { type: Schema.Types.ObjectId, ref: 'Product'},
		quantity: { type: Number, min: 1, max: 9999 },
		price: { type: Number, min: 1, max: 9999 }
	}]
});

mongoose.model('SalesOrder', SalesOrderSchema);
