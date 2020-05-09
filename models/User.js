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
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  }
);

User.associte = (models) => {
  User.hasMany(models.Jobs, {
    onDelete: 'CASCADE',
  });
};

module.exports = User;
