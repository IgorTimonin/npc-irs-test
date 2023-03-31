const ordersRouter = require('express').Router();
const { getAllOrders } = require('../controllers/orders');

// const { celebrate, errors } = require('celebrate');
// const {
//   tableIdValidator,
//   createtableValidator,
// } = require('../middlewares/dataValidation');
// const {
//   createtable,
//   gettables,
//   deletetable,
// } = require('../controllers/tables');

ordersRouter.get('/', getAllOrders);

// errors();
module.exports = { ordersRouter };
