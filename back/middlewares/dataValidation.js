const { Joi } = require('celebrate');

module.exports.createCustomerValidator = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    surname: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
    balance: Joi.number(),
  }),
};

module.exports.updateCustomerValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    surname: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    balance: Joi.number(),
  }),
};
