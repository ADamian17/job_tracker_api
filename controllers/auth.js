const bcrypt = require('bcryptjs');
const connection = require('../config/db.connection');
const db = require('../models');

// NOTE create a user
const createUser = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  let password = req.body.password;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please complete all fields',
    });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    password = hash;
    const user = await db.User.create({
      first_name,
      last_name,
      email,
      password,
    });
    if (user)
      return res.status(201).json({
        status: 201,
        message: 'success',
        requestedAt: new Date().toLocaleString(),
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: 'Something went wrong. Please try again',
    });
  }
};

const login = (req, res) => {};
const verify = (req, res) => {};
const logout = (req, res) => {};

module.exports = {
  createUser,
  login,
  verify,
  logout,
};
