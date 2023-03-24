const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('orders', {
    order_id: {
      types: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    items: {
      types: DataTypes.STRING,
      allowNull: false,
    },
    purchase_date: {
      types: DataTypes.DATE,
      allowNull: false,
    },
    total_cost: {
      types: DataTypes.NUMBER,
    },
    customer_id: {
      types: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
