const { Sequelize } = require('sequelize');
const { postgresPath } = require('../configs');

const { NODE_ENV, DB_PATH } = process.env;

// подключаемся к БД
const sequelize = new Sequelize(
  NODE_ENV === 'production' ? DB_PATH : postgresPath,
  {
    define: {
      freezeTableName: true, // соответствие имён моделей и таблиц
      timestamps: false, // отменяем создание timestamps
    },
  }
);

//  проверка соединения с БД
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Соединение c БД успешно установлено');
  } catch (error) {
    console.error('Ошибка подключения к БД:', error);
  }
}

// синхронизация данных с БД
async function syncDB() {
  try {
    await sequelize.sync();
    console.log('Синхронизация c БД выполнена успешно');
  } catch (error) {
    console.error('Ошибка синхронизации c БД', error);
  }
}

// импорт моделей
const Customers = require('./models/Customers')(sequelize);
const Orders = require('./models/Orders')(sequelize);

module.exports = {
  sequelize: Sequelize,
  customers: Customers,
  orders: Orders,
  testConnection,
  syncDB,
};
