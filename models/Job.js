const Sequelize = require('sequelize');
const db = require('../config/db.connection');

const Job = db.define(
  'job',
  {
    job_id: {
      type: Sequelize.INTEGER(),
      primaryKey: true,
    },
    job_position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    job_post_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    job_status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    on_site: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_screen: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    applied_date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    point_of_contact: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id_fk: {
      type: Sequelize.INTEGER(),
    },
  },
  {
    timestamps: false,
  }
);

Job.associte = (models) => {
  Job.belongsTo(models.User, {
    onDelete: 'CASCADE',
  });
};

module.exports = Job;
