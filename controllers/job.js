// NOTE Models
const { User, Job } = require('../models');

// NOTE Index
const index = async (req, res) => {
    const userId = req.user_id;

    try {
        const foundUser = await User.findById(userId).populate('jobs');

        res.json({
            status: 200,
            jobs: foundUser.jobs,
            requestedAt: new Date().toLocaleString(),
        });
        
    } catch ( err ) {

        if (err === 'TokenExpiredError') {
            console.log('hereeee')
        }

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

    try {

        const newJob = {
            ...req.body,
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

    try {
        const updatedJob = await Job.findByIdAndUpdate( 
            jobId,
            req.body, 
            { new: true } 
        );

        return res.status(201).json({
            status: 201,
            data: updatedJob,
            message: `Your job have being update it`,
        });

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
