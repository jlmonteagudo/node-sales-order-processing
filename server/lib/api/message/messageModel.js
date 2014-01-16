'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new Schema({
	text: { type: String, required: true }
});

mongoose.model('Message', MessageSchema);
