
module.exports = {

	tokenLife: 3600,

	
	development: {
		db: 'mongodb://localhost/boot-express-dev'
	},

	test: {
		db: 'mongodb://localhost/boot-express-test'
	},

	production: {
		db: 'mongodb://localhost/boot-express'
	}

};
