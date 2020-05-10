const connection = require('../config/db.connection');
const db = require('../models');

// NOTE All users
const index = async (req, res) => {
  try {
    const users = await db.User.findAll();
    if (users) {
      res.json({
        status: 200,
        data: users,
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

// NOTE Profile
const profile = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await db.User.findOne({ where: { user_id: user_id } });
    if (user) {
      res.status(200).json({ status: 200, data: user });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE Update user
const update = async (req, res) => {
  const userId = req.user_id;
  const { first_name, last_name, email } = req.body;

  const fields = [first_name, last_name, email];

  if (!fields) {
    return res.status(400).json({
      status: 400,
      message: 'Please complete all fields',
    });
  }

  try {
    const user = await db.User.update(
      { first_name: first_name, last_name: last_name, email: email },
      { where: { user_id: userId } }
    );

    if (user) {
      return res.status(201).json({
        status: 201,
        message: `Your user have being update it`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE delete user
const destroy = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await db.User.destroy({ where: { user_id: user_id } });
    if (user) {
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
  profile,
  update,
  destroy,
};
