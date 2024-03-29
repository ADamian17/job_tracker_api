const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader === 'undefined') throw 'forbidden';

    const token = bearerHeader.split(' ')[1];

    let payload = jwt.verify(token, process.env.SUPER_SECRET_KEY);

    req.user = payload._id; // set user id for routes to use

    next();
  } catch (error) {
    if (error === 'forbidden') {
      res.status(403).json({
        status: 403,
        message: 'forbidden',
      });
    } else {
      res.status(401).json({
        status: 401,
        ...error,
      });
    }
  }
};
