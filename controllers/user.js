// NOTE internal modules
const { User, Job } = require('../models');

// NOTE Profile
const profile = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);

    const applied = await Job.countDocuments({
      user: userId,
      job_status: 'applied',
    });

    const completed = await Job.countDocuments({
      user: userId,
      job_status: 'completed',
    });

    const in_progress = await Job.countDocuments({
      user: userId,
      job_status: 'in_progress',
    });

    const rejected = await Job.countDocuments({
      user: userId,
      job_status: 'rejected',
    });

    const no_response = await Job.countDocuments({
      user: userId,
      job_status: 'no_response',
    });

    const progress = [
      {
        label: 'Completed',
        count: completed,
      },
      {
        label: 'In progress',
        count: in_progress,
      },
      {
        label: 'No response',
        count: no_response,
      },
      {
        label: 'Rejected',
        count: rejected,
      },
      {
        label: 'Applied',
        count: applied,
      },
    ];

    res.status(200).json({
      status: 200,
      data: {
        user,
        progress,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE Update user
const update = async (req, res) => {
  const userId = req.user;
  const { first_name, last_name, email, profession } = req.body;

  const fields = [first_name, last_name, email];

  if (
    (!fields && first_name === '') ||
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
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );

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
  }
};

const addImg = async (req, res) => {
  const userId = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          profile_image: req.body.profile_image,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: 200,
      updatedUser,
      message: `Your user have being update it`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE delete user
const destroy = async (req, res) => {
  const userId = req.user;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    const deletedJobs = await Job.deleteMany({ user_id: userId });

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
  profile,
  update,
  addImg,
  destroy,
};
