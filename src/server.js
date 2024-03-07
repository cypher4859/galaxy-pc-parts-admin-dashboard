// src/server.js
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routers
const indexRouter = require('./router/index'); // Import the index router

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost/computer-parts-store');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Set the layout file (views/layout.ejs)
app.set('layout', 'layouts/layout');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the index router
app.use('/', indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
