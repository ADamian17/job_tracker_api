// NOTE internal modules
const { User, Job } = require('../models');
const { populate } = require('../models/Job');

// NOTE All users
const index = async (req, res) => {
    try {
        const users = await User.find({});

        res.json({
            status: 200,
            data: users,
            requestedAt: new Date().toLocaleString(),
        });

    } catch (err) {
        return res.status(500).json({
        status: 500,
        message: 'Something went wrong! Please try again',
        });
    }
};

// NOTE Profile
const profile = async (req, res) => {
  const userId = req.user;

    try {
        const user = await User.findById( userId )
        .populate('jobs')

        res.status(200).json({ 
            status: 200,
            data: user 
        });

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again',
        });
    };
};

// NOTE Update user
const update = async (req, res) => {
    const userId = req.user;
    const { first_name, last_name, email, profession } = req.body;

    const fields = [ first_name, last_name, email ];

    if ( !fields && 
            first_name === '' || 
            last_name === '' || 
            email === '' ||
            profession === ''
        ) {
        return res.status(400).json({
            status: 400,
            message: 'Please complete all fields',
        });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate( userId, req.body, { new: true });

        return res.status(200).json({
            status: 200,
            data: updatedUser,
            message: `Your user have being update it`,
        });
      
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again',
        });
    };
};

// NOTE delete user
const destroy = async (req, res) => {
    const userId = req.user;

    try {
        const deletedUser = await User.findByIdAndDelete( userId );

        const deletedJobs = await Job.deleteMany( { user_id: userId } )
        console.log(deletedJobs)
        
        return res.status(200).json({
            status: 200,
            data: deletedUser,
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
  profile,
  update,
  destroy,
};
