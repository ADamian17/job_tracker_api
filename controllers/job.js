// NOTE Models
const { User, Job } = require('../models');

// NOTE Index
const index = async (req, res) => {
    
    try {
        const userId = req.user;

        let jobs = null;
        
        // if the query exist then return filter jobs
        if ( Object.keys(req.query).length !== 0 ) {
            const query = req.query.job_status;

            jobs = await Job.find(
                { 
                    user: userId, 
                    job_status: { 
                        $eq: query 
                    }
                } 
            ).populate('user').sort('-createdAt');
            
            return res.json({
                status: 200,
                count: jobs.length,
                jobs,
                requestedAt: new Date().toLocaleString(),
            });
        }

        jobs = await Job.find({ user: userId }).populate('user').sort('-createdAt');

        res.json({
            status: 200,
            count: jobs.length,
            jobs,
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

    const userId = req.user;

    try {
        req.body.user = userId
        
        const createdJob = await Job.create( req.body );

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
            {
                $set: {
                    ...req.body,
                },
            },  
            { 
                new: true 
            } 
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

        const foundUser = await User.findById( deletedJob.user );
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
