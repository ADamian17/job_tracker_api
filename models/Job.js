const Sequelize = require('sequelize');
const db = require('../config/db.connection');

const Job = db.define(
  'job',
  {},

  {
    tableName: 'jobs',
    timestamps: false,
  }
);

module.exports = Job;
