const ordersRouter = require('express').Router();
const { getAllOrders } = require('../controllers/orders');

ordersRouter.get('/', getAllOrders);
module.exports = { ordersRouter };
