// NOTE Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;

const connection = new Sequelize('job_tracker_app', 'root', DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// NOTE Database connection
connection
  .authenticate()
  .then(() => console.log('db connected ;)'))
  .catch((err) => console.log(err));

module.exports = connection;
