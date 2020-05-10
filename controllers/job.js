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

  const fields = [
    job_position,
    job_post_url,
    job_status,
    company_name,
    on_site,
    phone_screen,
    applied_date,
    point_of_contact,
  ];

  if (!fields) {
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
      return res.status(200).json({
        status: 200,
        data: job,
        requestedAt: new Date().toLocaleString(),
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE One job
const showJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await db.Job.findOne({ where: { job_id: jobId } });
    if (job) {
      res.status(200).json({
        status: 200,
        data: job,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE Update job
const updateJob = async (req, res) => {
  const jobId = req.params.id;

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

  const fields = [
    job_position,
    job_post_url,
    job_status,
    company_name,
    on_site,
    phone_screen,
    applied_date,
    point_of_contact,
  ];

  if (!fields) {
    return res.status(400).json({
      status: 400,
      message: 'Please complete all fields',
    });
  }

  try {
    const job = await db.Job.update(
      {
        job_position: job_position,
        job_post_url: job_post_url,
        job_status: job_status,
        company_name: company_name,
        on_site: on_site,
        phone_screen: phone_screen,
        applied_date: applied_date,
        point_of_contact: point_of_contact,
      },
      { where: { job_id: jobId } }
    );

    if (job) {
      return res.status(201).json({
        status: 201,
        message: `Your job have being update it`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE delete job
const destroy = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await db.Job.destroy({ where: { job_id: jobId } });
    if (job) {
      return res.status(201).json({
        status: 201,
        message: 'success',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

module.exports = {
  index,
  createJob,
  showJob,
  updateJob,
  destroy,
};
