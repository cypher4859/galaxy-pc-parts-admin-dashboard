// src/server.js
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB (make sure MongoDB is running)
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Express-EJS-Layouts Middleware
app.use(expressLayouts);

// Set the layout file (views/layout.ejs)
app.set('layout', 'layouts/main');

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Index router
app.use('/', require('./router/index'));
app.use('/auth', require('./router/auth'));

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`);
});
