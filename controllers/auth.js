const bcrypt = require('bcryptjs');
const connection = require('../config/db.connection');
const db = require('../models');
const jwt = require('jsonwebtoken');

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

// NOTE login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter you email and password',
      });
    }

    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'Email or password is incorrect',
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const signedJwt = await jwt.sign(
        {
          _id: user.user_id,
        },
        'super_secret_key',
        {
          // its good practice to have an expiration amount for jwt tokens.
          expiresIn: '2h',
        }
      );
      return res.status(200).json({
        status: 200,
        message: 'Success',
        id: user.user_id,
        signedJwt,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Username or password is incorrect',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: 'Something went wrong. Please try again',
    });
  }
};

// NOTE Logout
const logout = (req, res) => {};

module.exports = {
  createUser,
  login,
  logout,
};

// search for attributes
// Project.findOne({ where: {title: 'aProject'} }).then(project => {
//   // project will be the first entry of the Projects table with the title 'aProject' || null
// })
