// src/router/categories.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

// @desc    Categories
// @route   GET /
router.get('/', ensureAuth, (req, res) => {
  res.render('categories/index');
});

module.exports = router;
