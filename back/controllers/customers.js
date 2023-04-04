const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const db = require('../db');
const { conflictEmailErr } = require('../errors/errorsConsts');

const Customers = db.customers;

module.exports.getAllCustomers = (req, res, next) => {
  Customers.findAll()
    .then((data) => res.send(data))
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
  Customers.update({ ...req.body }, { where: { id } })
    .then((customer) => {
      if (!customer) {
        throw new NotFoundError(`Клиент с id ${req.params.Id} не найден`);
      }
      return customer;
    })
    .then((customer) => {
      res.send(customer);
    })
    .catch(next);
};