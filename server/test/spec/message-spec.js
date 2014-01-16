'use strict';

var request = require('supertest');

request = request('http://localhost:3001');


describe('Message API', function () {


	describe('GET /messages - list', function() {

		it('should return a list of messages', function (done) {

			request
				.get('/api/messages')
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.length).toEqual(2);
					done();
				});

		});

		it('should filter the list of messages', function (done) {

			request
				.get('/api/messages?conditions={}&fields={"_id":0,"__v":0}&options={"limit":5}')
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.length).toEqual(2);
					done();
				});

		});


		it('should return status 400 when a malformed query', function (done) {

			request
				.get('/api/messages?conditions=xxxxx')
				.expect(400)
				.end(function(err) {
					if (err) { return done(err); }
					done();
				});

		});


	});



	describe('GET /messages - findById', function() {

		it('should return the message if the message id exists', function (done) {

			var id;

			request
				.get('/api/messages?conditions={"text": "this is a dummy message"}')
				.end(function(err, res) {

					id = res.body[0]._id;

					request
						.get('/api/messages/' + id)
						.expect(200)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.text).toEqual('this is a dummy message');
							done();
						});

				});
		});



		it('should return not-found error if the message id is wrong', function (done) {

			var id = 'not-found';

			request
				.get('/api/messages/' + id)
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('not-found');
					done();
				});

		});


		it('should return not-found error if the message id does not exist', function (done) {

			var id = 'xxa49eb764e2a1315d000001';

			request
				.get('/api/messages/' + id)
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('not-found');
					done();
				});

		});



	});



	describe('PUT /messages - update', function() {

		it('should retrieve and updates a message', function (done) {

			var myMessage;

			request
				.get('/api/messages?conditions={"text": "testing"}')
				.end(function(err, res) {

					myMessage = res.body[0];
					myMessage.text = 'testing updated';

					request
						.put('/api/messages/' + myMessage._id)
						.send(myMessage)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.text).toEqual('testing updated');
							done();
						});

				});

		});



		it('should fail updading an user id that does not exist', function (done) {

			var myMessage;

			request
				.get('/api/messages?conditions={"text": "this is a dummy message"}')
				.end(function(err, res) {

					myMessage = res.body[0];
					myMessage.text = 'updated text';

					request
						.put('/api/messages/xxa49eb764e2a1315d000001')
						.send(myMessage)
						.expect(404)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.code).toEqual('not-found');
							done();
						});

				});

		});


	});



	describe('POST /messages - create', function() {

		it('should create a new message', function (done) {

			var sample = {
				'text': 'this is a test message'
			};

			request
				.post('/api/messages')
				.send(sample)
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.text).toEqual('this is a test message');
					done();
				});

		});

	});


	describe('DEL /messages - delete', function() {

		it('should create and delete a message', function (done) {

			var deleteMessage = {
				'text': 'message deleted'
			};


			request
				.post('/api/messages')
				.send(deleteMessage)
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }

					deleteMessage = res.body;

					request
						.del('/api/messages/' + deleteMessage._id)
						.expect(200)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body._id).toEqual(deleteMessage._id);
							done();
						});

				});



		}); // end - it creates and deletes a message



		it('should fail deleting a message id that does not exist', function (done) {

			request
				.del('/api/messages/xxa49eb764e2a1315d000001')
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.code).toEqual('not-found');
					done();
				});

		});


	}); // end - describe DEL /messages - delete


});
