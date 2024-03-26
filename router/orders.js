// src/router/products.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

// @desc    Orders
// @route   GET /
router.get('/', ensureAuth, async (req, res) => {
  try {
    res.render('orders/index');
  } catch {
    res.redirect('/');
  }
});

module.exports = router;
