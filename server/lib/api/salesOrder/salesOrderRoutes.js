'use strict';

var salesOrderController = require('./salesOrderController');
//var passport = require('passport');

module.exports = function (app) {

	app.get('/api/sales-orders/:salesOrderId', salesOrderController.findById);
	app.get('/api/sales-orders', salesOrderController.list);
	app.put('/api/sales-orders/:salesOrderId', salesOrderController.update);
	app.post('/api/sales-orders', salesOrderController.create);
	app.del('/api/sales-orders/:salesOrderId', salesOrderController.delete);

	app.param('salesOrderId', salesOrderController.load);

};
