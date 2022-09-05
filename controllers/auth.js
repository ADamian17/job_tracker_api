// NOTE external modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// NOTE internal modules
const { User } = require('../models');

// NOTE create a user
const createUser = async (req, res) => {
  const { first_name, last_name, email, profession } = req.body;

  let password = req.body.password;

  const fields = [first_name, last_name, email, password, profession];

  try {
    if (
      (!fields && first_name === '') ||
      last_name === '' ||
      email === '' ||
      password === '' ||
      profession === ''
    ) {
      throw 'emptyForm';
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).json({
        status: 400,
        message: 'Something went wrong. Please try again',
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    password = hash;

    const newUser = {
      first_name,
      last_name,
      email,
      password,
      profession,
    };

    await User.create(newUser);

    return res.status(201).json({
      status: 201,
      message: 'User created',
      requestedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    if (err === 'emptyForm') {
      return res.status(400).json({
        status: 400,
        message: 'Form can not be empty, Please complete all fields !',
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'Email or password. Please try again.',
      });
    }
  }
};

// NOTE login
const login = async (req, res) => {
  const { email, password } = req.body;
  const fields = [email, password];

  try {
    if ((!fields && email === '') || password === '') {
      throw 'emptyForm';
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw 'invalidUser';
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const signedJwt = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.SUPER_SECRET_KEY,
        {
          expiresIn: '10h',
        }
      );

      return res.status(200).json({
        status: 200,
        message: 'Success',
        id: user._id,
        signedJwt,
      });
    }
  } catch (err) {
    if (err === 'emptyForm') {
      return res.status(400).json({
        status: 400,
        name: 'empty form',
        message: 'Please enter you email and password, can not be empty.',
      });
    } else if (err === 'invalidUser') {
      return res.status(400).json({
        status: 400,
        name: 'invalid user',
        message: `This user doesn't exist, Please try again.`,
      });
    } else {
      console.log(err);
      res.status(400).json({
        status: 400,
        message: 'Email or password. Please try again.',
      });
    }
  }
};

module.exports = {
  createUser,
  login,
};
