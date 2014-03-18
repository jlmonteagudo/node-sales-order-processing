'use strict';

var request = require('supertest');

request = request('http://localhost:3001');


describe('User API', function () {

	describe('GET /users - list', function() {

		it('should return a list of users', function (done) {

			request
				.get('/api/users')
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.results.length).toEqual(10);
					done();
				});

		});


		it('should filter the list of users', function (done) {

			request
				.get('/api/users?conditions={"age":{"$gt":30}}&fields={"_id":0,"__v":0}&options={"limit":2}')
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.results.length).toEqual(2);
					done();
				});

		});


		it('should return status 400 when a malformed query', function (done) {

			request
				.get('/api/users?conditions=xxxxx')
				.expect(400)
				.end(function(err) {
					if (err) { return done(err); }
					done();
				});

		});


	});



	describe('GET /users - findById', function() {

		it('should return the user if the user id exists', function (done) {

			var id;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {
					console.info(res);
					id = res.body.results[0]._id;

					request
						.get('/api/users/' + id)
						.expect(200)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.surname).toEqual('Simeone');
							done();
						});

				});
		});



		it('should return not-found error if the user id is wrong', function (done) {

			var id = 'not-found';

			request
				.get('/api/users/' + id)
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('not-found');
					done();
				});

		});


		it('should return not-found error if the user id does not exist', function (done) {

			var id = 'xxa49eb764e2a1315d000001';

			request
				.get('/api/users/' + id)
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('not-found');
					done();
				});

		});



	});




	describe('PUT /users - update', function() {

		it('should retrieve and update an user', function (done) {

			var simeone;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					simeone = res.body.results[0];
					simeone.age = 41;

					request
						.put('/api/users/' + simeone._id)
						.send(simeone)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.age).toEqual(41);
							done();
						});

				});

		});


		it('should fail updading wrong age', function (done) {

			var simeone;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					simeone = res.body.results[0];
					simeone.age = 'abc';

					request
						.put('/api/users/' + simeone._id)
						.send(simeone)
						.expect(400)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.code).toEqual('update-error');
							done();
						});

				});

		});


		it('should fail updading an user id that does not exist', function (done) {

			var simeone;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					simeone = res.body.results[0];
					simeone.age = 'abc';

					request
						.put('/api/users/xxa49eb764e2a1315d000001')
						.send(simeone)
						.expect(404)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.code).toEqual('not-found');
							done();
						});

				});

		});



	});



	describe('POST /users - create', function() {

		it('should create a new user', function (done) {

			var guilavogui = {
				'username': 'guilavogui',
				'password': 'guilavogui',
				'name': 'Joshua',
				'surname': 'Guilavogui',
				'age': 23,
				'email': 'guilavogui@atm.com'
			};

			request
				.post('/api/users')
				.send(guilavogui)
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.age).toEqual(23);
					done();
				});

		});


		it('should fail creating an user with wrong data', function (done) {

			var guilavogui = {
				'username': 'guilavogui',
				'password': 'guilavogui',
				'name': 'Joshua',
				'surname': 'Guilavogui',
				'age': 'abc',
				'email': 'guilavogui@atm.com'
			};

			request
				.post('/api/users')
				.send(guilavogui)
				.expect(400)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('create-error');
					done();
				});

		});


	});



	describe('DEL /users - delete', function() {

		it('should create and delete an user', function (done) {

			var deleteUser = {
				'username': 'delete',
				'password': 'delete',
				'name': 'delete',
				'surname': 'surname',
				'age': 23,
				'email': 'delete@atm.com'
			};


			request
				.post('/api/users')
				.send(deleteUser)
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }

					deleteUser = res.body;

					request
						.del('/api/users/' + deleteUser._id)
						.expect(200)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body._id).toEqual(deleteUser._id);
							done();
						});

				});



		}); // end - it creates and deletes an user



		it('should fail deleting an user id that does not exist', function (done) {

			request
				.del('/api/users/xxa49eb764e2a1315d000001')
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('not-found');
					done();
				});

		});


	}); // end - describe DEL /users - delete



});
