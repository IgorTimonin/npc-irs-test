const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('orders', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    items: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.NUMBER,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
