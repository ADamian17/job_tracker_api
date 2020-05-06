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

User.associte = (models) => {
  User.hasOne(models.Profile, {
    onDelete: 'CASCADE',
  });
  User.hasMany(models.Jobs, {
    onDelete: 'CASCADE',
  });
};

module.exports = User;
