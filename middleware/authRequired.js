const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log(req.user_id);
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    console.log(token);
    let payload = jwt.verify(token, 'super_secret_key');
    req.user_id = payload._id; //set user id for routes to use
    next();
  } else {
    res.sendStatus(403);
  }
};
