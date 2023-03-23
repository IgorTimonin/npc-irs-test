// const Table = require('../models/table');
// const NotFoundError = require('../errors/NotFoundError');
// const BadRequestError = require('../errors/BadRequestError');
// const ForbiddenError = require('../errors/ForbiddenError');
// const { cantDeleteOtherTableErr, tableNotFoundErr, reqTableDataErr } = require('../errors/errorsConsts');

// module.exports.createTable = (req, res, next) => {
//   Table.create({ ...req.body, owner: req.user._id })
//     .then((table) => res.status(201).send(table))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new BadRequestError(reqTableDataErr));
//       } else {
//         next(err);
//       }
//     });
// };

// module.exports.getTables = (req, res, next) => {
//   Table.find({ owner: req.user._id })
//     .then((table) => res.send(table))
//     .catch(next);
// };

// module.exports.deleteTable = (req, res, next) => {
//   Table.findById(req.params.Id)
//     .then((table) => {
//       if (!table) {
//         throw new NotFoundError(tableNotFoundErr);
//       }
//       if (table.owner.toString() !== req.user._id) {
//         throw new ForbiddenError(cantDeleteOtherTableErr);
//       }
//       return table.remove();
//     })
//     .then((table) => {
//       res.send(table);
//     })
//     .catch(next);
// };
