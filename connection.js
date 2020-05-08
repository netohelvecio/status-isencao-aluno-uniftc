const knex = require('knex');
require('dotenv').config();

const connection = knex({
  client: 'mssql',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
  }
});

module.exports = connection;