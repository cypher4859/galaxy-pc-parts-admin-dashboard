// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost/computer-parts-store');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Set up basic route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'views', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  res.send(indexContent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
