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
    const errorMessage = req.flash('error');
    res.render('categories/index', { categories: categories, errorMessage: errorMessage });
  } catch {
    console.error('Error fetching categories:', error);
    req.flash('error', 'Error fetching categories');
    res.redirect('/');
  }
});

// @desc    Create Categories
// @route   POST products/
router.post('/', ensureAuth, async (req, res) => {
  // Create a new category object based on the incoming request
  const category = new Category({
    name: req.body.name,
    parentCategory: req.body.parentCategory,
  });

  try {
    // Try saving the new category
    const newCategory = await category.save();
    // If successful, redirect the user to the categories page
    res.redirect('/categories');
  } catch (error) {
    // Handle database save errors

    // Log the error for debugging purposes
    console.error('Error saving category:', error);

    try {
      // Attempt to retrieve all categories from the database
      const categories = await Category.find();
      // Render the categories index view with an error message and the retrieved categories
      res.render('categories/index', {
        categories: categories,
        errorMessage: 'Error creating category',
      });
    } catch (findError) {
      // If an error occurs while trying to find categories, log the error
      console.error('Error finding categories:', findError);
      // Render the categories index view with only an error message
      res.render('categories/index', {
        errorMessage: 'Error creating category',
      });
    }
  }
});

// @desc    Delete Products
// @route   DELETE products/:id/delete
router.delete('/delete/:id', ensureAuth, async (req, res) => {
  try {
    // Check if any child categories exist for the parent category to be deleted
    const childCategories = await Category.find({ parentCategory: req.params.id });
    if (childCategories.length > 0) {
      // If child categories exist, render an error message to the user
      req.flash('error', 'Cannot delete parent category with existing child categories.');
      return res.redirect('/categories');
    }

    // If no child categories exist, proceed with deleting the parent category
    await Category.findByIdAndDelete(req.params.id);
    // Redirect to the categories page or send a success response
    res.redirect(`/categories`);
  } catch (err) {
    // Handle errors
    console.error('Error deleting category:', err);
    req.flash('error', 'Error deleting category');
    res.redirect('/categories');
  }
});

module.exports = router;
