const connection = require('../config/db.connection');
const db = require('../models');

// NOTE All users
const index = (req, res) => {
  db.User.findAll()
    .then((users) => {
      res.json({
        status: 200,
        data: users,
        requestedAt: new Date().toLocaleString(),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: 500,
        error: [{ message: 'Something went wrong! Please try again' }],
      });
    });
};

module.exports = {
  index,
};
