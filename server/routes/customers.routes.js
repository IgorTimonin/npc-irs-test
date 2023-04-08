const customersRouter = require('express').Router();
const { celebrate, errors } = require('celebrate');
const {
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} = require('../controllers/customers');
const {
  createCustomerValidator,
  updateCustomerValidator,
} = require('../middlewares/dataValidation');

customersRouter.get('/', getAllCustomers);
customersRouter.post('/', celebrate(createCustomerValidator), createCustomer);
customersRouter.patch(
  '/:id',
  celebrate(updateCustomerValidator),
  updateCustomer,
);
customersRouter.delete('/:id', deleteCustomer);

errors();
module.exports = { customersRouter };
