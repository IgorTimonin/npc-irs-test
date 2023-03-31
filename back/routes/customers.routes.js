const customersRouter = require('express').Router();
const {
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} = require('../controllers/customers');

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

customersRouter.get('/', getAllCustomers);
customersRouter.post('/', createCustomer);
customersRouter.patch('/:id', updateCustomer);
customersRouter.delete('/:id', deleteCustomer);

// errors();
module.exports = { customersRouter };
