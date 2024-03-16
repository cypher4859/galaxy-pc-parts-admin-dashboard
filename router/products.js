// src/router/products.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Product = require('../models/Product');

// @desc    Products
// @route   GET /
router.get('/', ensureAuth, async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('products/index', { products: products });
  } catch {
    res.redirect('/');
  }
});

// @desc    Add New Products
// @route   GET products/new
router.get('/new', ensureAuth, (req, res) => {
  res.render('products/new', { product: new Product() });
});

// @desc    Edit Product Page
// @route   GET products/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product: product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

// @desc    Delete Product Page
// @route   GET products/delete/:id
router.get('/delete/:id', ensureAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('products/delete', { product: product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

// @desc    Create Product
// @route   POST products/
router.post('/', /* upload.array('photos', 5), */ ensureAuth, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    // images: req.files.map((file) => file.path), // Save file paths in the images array
  });

  try {
    const newProduct = await product.save();
    //res.redirect(`products/${newProduct.id}`);
    // Redirect to the product listing page after successful creation
    res.redirect(`products`);
  } catch (err) {
    // Handle database save errors
    res.render('products/new', {
      product: product,
      errorMessage: 'Error creating product',
    });
  }
});

// @desc    Update Products
// @route   PUT products/:id
router.put('/:id', /* upload.array('photos', 5), */ ensureAuth, async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    // product.images = req.files.map((file) => file.path); // Save file paths in the images array
    await product.save();
    res.redirect(`/products`);
  } catch (err) {
    if (product == null) {
      res.redirect('/products');
    } else {
      res.render('products/edit', {
        product: product,
        errorMessage: 'Error updating product',
      });
    }
  }
});

// @desc    Delete Products
// @route   DELETE products/:id/delete
router.delete('/delete/:id', ensureAuth, async (req, res) => {
  let product;
  try {
    product = await Product.findByIdAndDelete(req.params.id);

    res.redirect(`/products`);
  } catch (err) {
    if (product == null) {
      res.redirect('/products');
    } else {
      res.render('/products', {
        product: product,
        errorMessage: 'Error deleting product',
      });
    }
  }
});

module.exports = router;
