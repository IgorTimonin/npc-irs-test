const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define(
    'customers',
    {
      id: {
        types: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      creation_date: {
        types: DataTypes.DATE,
        allowNull: false,
      },
      name: {
        types: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        types: DataTypes.STRING,
      },
      email: {
        types: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        types: DataTypes.NUMBER,
      },
    },
  );
};
