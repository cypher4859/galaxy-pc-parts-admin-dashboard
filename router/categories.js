// src/router/categories.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Category = require('../models/Category');

// @desc    Categories
// @route   GET /
router.get('/', ensureAuth, async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render('categories/index', { categories: categories });
  } catch {
    res.redirect('/');
  }
});

// @desc    Create Categories
// @route   POST products/
router.post('/', ensureAuth, async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.redirect('/categories');
  } catch (error) {
    // Handle database save errors
    // Handle database save errors
    console.error('Error saving category:', error);
    res.render('categories/index', {
      errorMessage: 'Error creating category',
    });
  }
});

// @desc    Delete Products
// @route   DELETE products/:id/delete
router.delete('/delete/:id', ensureAuth, async (req, res) => {
  let category;
  try {
    category = await Category.findByIdAndDelete(req.params.id);

    res.redirect(`/categories`);
  } catch (err) {
    if (category == null) {
      res.redirect('/categories');
    } else {
      res.render('/categories', {
        product: product,
        errorMessage: 'Error deleting category',
      });
    }
  }
});

module.exports = router;
