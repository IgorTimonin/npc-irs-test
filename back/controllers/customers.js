const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const db = require('../db');
const { conflictEmailErr } = require('../errors/errorsConsts');

const Customers = db.customers;
// параметры пагинации/частичной загрузки данных
const paginate = (page) => {
  const limit = 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

module.exports.getAllCustomers = (req, res, next) => {
  const { page } = req.query;
  console.log(req.query);
  Customers.findAll({
    ...paginate(page),
  })
    .then((data) => res.send(data))
    .catch(() => {
      if (!req.body.page) {
        next(new BadRequestError('не передан номер страницы c данными'));
      }
    })
    .catch(next);
};

module.exports.createCustomer = (req, res, next) => {
  Customers.create({ ...req.body })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        next(new ConflictError(conflictEmailErr));
      } else if (err.message === 'Validation failed') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.massage)
              .join(', ')}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteCustomer = (req, res, next) => {
  const { id } = req.params;
  Customers.destroy({ where: { id }, force: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Клиент c id ${id} не найден`);
      }
    })
    .then(() => {
      res.send(`Клиент c id ${id} удалён`);
    })
    .catch(next);
};

module.exports.updateCustomer = (req, res, next) => {
  const { id } = req.params;
  Customers.update({ ...req.body }, { where: { id }, returning: true })
    .then((customer) => {
      if (!customer) {
        throw new NotFoundError(`Клиент c id ${req.params.Id} не найден`);
      }
      return customer;
    })
    .then((customer) => {
      res.send(customer);
    })
    .catch(next);
};
