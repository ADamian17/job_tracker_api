// NOTE external modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// NOTE internal modules
const { User, Job } = require('../models');

// NOTE create a user
const createUser = async (req, res) => {
    const { first_name, last_name, email, profession } = req.body;

    let password = req.body.password;

    const fields = [ first_name, last_name, email, password, profession ];

    if (!fields && 
        first_name === '' || 
        last_name === '' || 
        email === '' || 
        password === '' || 
        profession === '' ) {

        return res.status(400).json({
        status: 400,
        message: 'Please complete all fields',
        });
    }

    try {

        const foundUser = await User.findOne({ email: email });

        if( foundUser ) {
            return res.status(400).json({
                status: 400,
                message: 'Something went wrong! Please try again',
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        password = hash;

        const newUser = {
            first_name, 
            last_name, 
            email,
            password, 
            profession
        }

        await User.create(newUser);

        return res.status(201).json({
            status: 201,
            message: 'Success',
            requestedAt: new Date().toLocaleString(),
        });

    } catch (err) {
        console.log(err);
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
                process.env.SUPER_SECRET_KEY,
                {
                // its good practice to have an expiration amount for jwt tokens.
                expiresIn: '3h',
                }
            );

            return res.status(200).json({
                status: 200,
                message: 'Success',
                id: user.user_id,
                signedJwt,
            });
        }

    } catch (err) {
        res.status(400).json({
        status: 400,
        message: 'Something went wrong. Please try again',
        });
    }
};

module.exports = {
    createUser,
    login,
};
