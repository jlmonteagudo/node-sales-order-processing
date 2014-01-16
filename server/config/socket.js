'use strict';

var socketio = require('socket.io');

exports.listen = function (server) {
	var io = socketio.listen(server);
	exports.io = io;
};
