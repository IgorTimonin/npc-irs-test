const db = require('../db');

const Orders = db.orders;

module.exports.getAllOrders = (req, res, next) => {
  Orders.findAll()
    .then((data) => res.send(data))
    .catch(next);
};
