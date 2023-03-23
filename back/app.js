require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const NotFoundError = require('./errors/NotFoundError');
const { postgresPath, localPort } = require('./configs');
const { errorHandler } = require('./middlewares/errorHandler');
const { pageNotFoundErr } = require('./errors/errorsConsts');

const { NODE_ENV, DB_PATH, PORT } = process.env;
const sequelize = new Sequelize(
  NODE_ENV === 'production' ? DB_PATH : postgresPath,
);
app.use(requestLogger); // логгер запросов
app.use(express.json());

//  проверка соединения с БД
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Соединение с БД успешно установлено');
  } catch (error) {
    console.error('Ошибка подключения к БД:', error);
  }
}

testConnection();

app.use('/*', (req, res, next) => {
  next(new NotFoundError(pageNotFoundErr));
});
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок
app.listen(PORT || localPort);
