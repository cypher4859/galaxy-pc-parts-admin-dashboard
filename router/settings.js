// src/router/products.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

// @desc    Settings
// @route   GET /
router.get('/', ensureAuth, async (req, res) => {
  try {
    res.render('settings/index');
  } catch {
    res.redirect('/');
  }
});

module.exports = router;
