const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

// NOTE Internal Modules
const routes = require('./routes');

// SECTION ---------------- Middleware --------------- SECTION //
// NOTE Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// NOTE API Routes
app.use('/api/v1/users', routes.user);

// NOTE Server
app.listen(PORT, console.log(`server connected at port: ${PORT}`));
