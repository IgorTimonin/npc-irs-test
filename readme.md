# Fullstack приложение на React & NodeJS
## Template c таблицами, загружаемыми с сервера.
<image src="/src/img/react-ag-grid.jpg" alt="скриншот страницы проекта">
  
Для запуска необходимо:

1) Установить все зависимости, для этого запустить npm install в директориях client и server;
2) создать БД npc-test в PostgreSQL, для этого необходимо в pgAgent создать новую БД npc-test и восстановить её из файла init-db.sql;
3) в файле server/configs/index.js указать путь до БД npc-test и пароль к PostgreSQL (по умолчанию postgres)
4) Запустить сервер, для этого в директории server, выполнить команду npm run start;
5) Запустить клиентское приложение, для этого в директории client выполнить команду npm run start;
