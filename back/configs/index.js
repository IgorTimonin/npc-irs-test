// адрес БД и пароль. Пример: postgres://postgres:*пароль*@localhost:5432/*название БД*?schema-public
const postgresPath = 'postgres://postgres:admin@localhost:5432/npc-test?schema-public';
const localPort = 4001;

module.exports = {
  postgresPath,
  localPort,
};
