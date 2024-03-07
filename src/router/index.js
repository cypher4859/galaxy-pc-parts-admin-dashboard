// src/router/index.js
const express = require('express');
const router = express.Router();

// Index route
router.get('/', (req, res) => {
  res.render('index', { title: 'Computer Parts Store' });
});

module.exports = router;
