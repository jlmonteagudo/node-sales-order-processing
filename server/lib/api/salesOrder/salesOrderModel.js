'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment'),
	states = 'received preparing closed'.split(' '),
	_ = require('lodash');

autoIncrement.initialize(mongoose.connection);

var SalesOrderSchema = new Schema({
	created: { type: Date, default: Date.now },
	state: { type: String, enum: states, required: true, default: 'received' },
	customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true},
	lines: [{
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
		quantity: { type: Number, min: 1, max: 9999, required: true },
		price: { type: Number, min: 1, max: 9999, required: true }
	}]
}, { autoIndex: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });


SalesOrderSchema.virtual('amount').get(function () {
	var amount = _.reduce(this.lines, function(amount, line) {
		return amount + (line.quantity * line.price);
	}, 0);

	return amount;
});

SalesOrderSchema.plugin(autoIncrement.plugin, 'SalesOrder');

mongoose.model('SalesOrder', SalesOrderSchema);
