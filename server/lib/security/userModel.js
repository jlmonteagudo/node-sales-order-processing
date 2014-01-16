'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');


var UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	surname:  {
		type: String,
		required: true
	},
	age: {
		type: Number,
		min: 1,
		max: 100
	},
	email:  {
		type: String,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	//more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

UserSchema.virtual('userId')
	.get(function () {
		return this.id;
	});

UserSchema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = crypto.randomBytes(32).toString('base64');
		//more secure - this.salt = crypto.randomBytes(128).toString('base64');
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword; });


UserSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

mongoose.model('User', UserSchema);
