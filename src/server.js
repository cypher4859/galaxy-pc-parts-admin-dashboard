// src/server.js
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

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

// Set up basic route
app.get('/', (req, res) => {
  // Render the index.ejs file with the specified layout
  res.render('index', { title: 'Computer Parts Store' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
