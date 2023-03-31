require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const NotFoundError = require('./errors/NotFoundError');
const { localPort } = require('./configs');
const { errorHandler } = require('./middlewares/errorHandler');
const { pageNotFoundErr } = require('./errors/errorsConsts');
const { testConnection, syncDB } = require('./db');
const { customersRouter } = require('./routes/customers.routes');
const { ordersRouter } = require('./routes/orders.routes');

const { NODE_ENV, PORT } = process.env;
const port = NODE_ENV === 'production' ? PORT : localPort;

app.use(requestLogger); // логгер запросов
app.use(express.json());
testConnection();
syncDB();
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/*', (req, res, next) => {
  next(new NotFoundError(pageNotFoundErr));
});
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок
app.listen(port);
