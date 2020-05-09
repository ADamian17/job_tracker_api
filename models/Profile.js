const Sequelize = require('sequelize');
const db = require('../config/db.connection');

const Profile = db.define(
  'profile',
  {
    profile_id,
    profession,
    profile_photo,
    applied_job_count,
  },
  {
    tableName: 'profiles',
    timestamps: false,
  }
);
