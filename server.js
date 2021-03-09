const express = require('express');
const cors = require('cors');

/* security */
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

/* NOTE Internal Modules */
const routes = require('./routes');


const app = express();

/* rate limit */
const LIMIT = rateLimit({
    max: 10000,
    windowMs: 24 * 60 * 60 * 1000, // 1 day 
    message: 'Too many requests' 
})

/* SECTION config */

/* NOTE Cors */
const corsOption = {
    origin: [ process.env.REACT_APP_URL, 'http://localhost:3000' ],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use( cors(corsOption) );

/* SECTION ---------------- Middleware --------------- */

/* NOTE Body Parser */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* NOTE use rate limiting */
app.use( LIMIT );

/* NOTE reset headers */
app.use(helmet());

/* sanitize data coming in from req.body */
app.use(mongoSanitize());

/* logger */
app.use( (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next(); 
});

app.get('', (req, res ) => {
    res.send('<h1>track that job api</h1>');
});

/* NOTE API Routes */
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/jobs', routes.job);

// /* SECTION ----------------- Server -------------------- */
app.listen( PORT, () => console.log(`server connected at ${PORT}`));
