const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        let payload = jwt.verify(token, process.env.SUPER_SECRET_KEY /*change this*/);
        console.log(payload);
        req.user_id = payload._id; //set user id for routes to use
        next();

        if (!payload) {
            console.log(jwt.JsonWebTokenError);
        }
        
    } else {
        res.sendStatus(403);
    }
};
