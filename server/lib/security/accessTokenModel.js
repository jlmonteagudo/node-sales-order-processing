var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var AccessTokenSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	clientId: {
		type: String,
		required: true
	},
	token: {
		type: String,
		unique: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('AccessToken', AccessTokenSchema);
