const Sequelize = require('sequelize');
const db = require('../config/db.connection');

const User = db.define(
  'user',
  {
    user_id: {
      type: Sequelize.INTEGER(),
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  }
);

module.exports = User;
