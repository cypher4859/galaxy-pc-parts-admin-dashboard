// src/server.js
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

const mongooseCollection = mongoose.connection;
// Set up session store with connect-mongodb-session
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
  mongooseConnection: mongooseCollection,
});

// Use the store in your session configuration
// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Method Override Middleware
app.use(methodOverride('_method'));

// Serve folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Body Parser
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Routes
// Index router
app.use('/', require('./router/index'));
app.use('/auth', require('./router/auth'));
app.use('/products', require('./router/products'));

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`);
});
