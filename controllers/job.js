const connection = require('../config/db.connection');
const db = require('../models');

// NOTE Index
const index = async (req, res) => {
  const user_id = req.user_id;
  try {
    const jobs = await db.Job.findAll({ where: { user_id_fk: user_id } });
    if (jobs) {
      res.json({
        status: 200,
        data: jobs,
        requestedAt: new Date().toLocaleString(),
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong! Please try again',
    });
  }
};

// NOTE Create
const createJob = async (req, res) => {
  const user_id = req.user_id;
  // console.log(user_id);
  const {
    job_position,
    job_post_url,
    job_status,
    company_name,
    on_site,
    phone_screen,
    applied_date,
    point_of_contact,
  } = req.body;

  if (
    !job_position ||
    !job_post_url ||
    !job_status ||
    !company_name ||
    !on_site ||
    !phone_screen ||
    !applied_date ||
    !point_of_contact
  ) {
    return res.status(400).json({
      status: 400,
      message: 'Please complete all fields',
    });
  }

  try {
    const job = await db.Job.create({
      job_position,
      job_post_url,
      job_status,
      company_name,
      on_site,
      phone_screen,
      applied_date,
      point_of_contact,
      user_id_fk: user_id,
    });
    if (job) {
      console.log(job);
      return res.status(200).json({
        status: 200,
        data: job,
        requestedAt: new Date().toLocaleString(),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: 'Something went wrong. Please try again',
    });
  }
};

module.exports = {
  index,
  createJob,
};
