angular.module('sop.common.services', ['btford.socket-io'])

	.factory('socketService', ['socketFactory', 'URLAPIServer', function(socketFactory, URLAPIServer) {

		var ioConnection = io.connect(URLAPIServer);
		var socket = socketFactory({
			ioSocket: ioConnection
		});

		return socket;
	}]);


