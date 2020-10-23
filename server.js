const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3001;

// NOTE Internal Modules
const routes = require('./routes');

// SECTION ---------------- Middleware --------------- //
// NOTE public directory config
app.use('/images', express.static( 'public') );

// NOTE Cors
const corsOption = {
    origin: [ process.env.REACT_APP_URL, 'http://localhost:3000' ],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

// NOTE Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next() 
})

app.get('', (req, res ) => {
    res.send('<h1>track that job api</h1>')
})

// NOTE API Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/jobs', routes.job);

// SECTION ----------------- Server -------------------- //
app.listen( PORT, () => console.log(`server connected at ${PORT}`));
