'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SalesOrderSchema = new Schema({
	created: { type: Date, default: Date.now },
	customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true},
	lines: [{
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
		quantity: { type: Number, min: 1, max: 9999, required: true },
		price: { type: Number, min: 1, max: 9999, required: true }
	}]
});

mongoose.model('SalesOrder', SalesOrderSchema);
