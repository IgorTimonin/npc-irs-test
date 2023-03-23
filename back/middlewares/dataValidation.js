const { Joi } = require('celebrate');

module.exports.createTableValidator = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    tableId: Joi.number().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
  }),
};

module.exports.tableIdValidator = {
  params: Joi.object().keys({
    Id: Joi.string()
      .required()
      .min(24)
      .max(24)
      .pattern(/^[a-f\d]{24}$/i),
  }),
};
