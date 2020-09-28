// NOTE Models
const { User, Job } = require('../models');

// NOTE Index
const index = async (req, res) => {
    const userId = req.user_id;

    try {
        const jobs = await Job.find({ user_id: userId });

        res.json({
            status: 200,
            data: jobs,
            requestedAt: new Date().toLocaleString(),
        });
        
    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: err,
            message: 'Something went wrong! Please try again',
        });
    }
};


// NOTE Create
const createJob = async (req, res) => {
    const userId = req.user_id;
    // NOTE discontructed req.body

    const {
        job_position,
        job_post_url,
        company_name,
        point_of_contact,
    } = req.body;

    const fields = [
        job_position,
        job_post_url,
        company_name,
        point_of_contact,
    ];

    // NOTE fields validation
    if ( !fields && 
        job_position === '' || 
        job_post_url === '' || 
        company_name === '' || 
        point_of_contact === '' ) {
        return res.status(400).json({
            status: 400,
            message: 'Please complete all fields',
        });
    }

    try {
        const newJob = {
            job_position,
            job_post_url,
            company_name,
            point_of_contact,
            user_id: userId
        }
        
        const createdJob = await Job.create( newJob );

        const foundUser = await User.findById( userId );
        foundUser.jobs.push( createdJob );
        await foundUser.save() 

        res.status(200).json({
            status: 200,
            data: createJob,
            requestedAt: new Date().toLocaleString(),
        });

    } catch (err) {
        res.status(400).json({
        status: 400,
        error: err,
        message: 'Something went wrong. Please try again',
        });
    }
};


// NOTE One job
const showJob = async (req, res) => {
    const jobId = req.params.id;
    
    try {

        const job = await Job.findById( jobId );

        return res.status(200).json({
            status: 200,
            data: job,
        });

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

        const deletedJob = await Job.findByIdAndDelete( jobId );

        const foundUser = await User.findById( deletedJob.user_id );
        foundUser.jobs.remove( deletedJob );
        foundUser.save()

        return res.status(201).json({
            status: 201,
            data: deletedJob,
            message: 'success',
        });
        
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
