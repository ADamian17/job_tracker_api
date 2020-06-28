const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

// NOTE Internal Modules
const routes = require('./routes');

// SECTION ---------------- Middleware --------------- SECTION //
// NOTE Cors
const corsOption = {
  origin: process.env.REACT_APP_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

// NOTE Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// NOTE API Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/jobs', routes.job);

// SECTION ----------------- Server -------------------- SECTION //
app.listen(PORT, console.log(`server connected at port: ${PORT}`));
