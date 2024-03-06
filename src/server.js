// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost/computer-parts-store');

// Set up basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Computer Parts Store!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
