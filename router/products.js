// src/router/products.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Product = require('../models/Product');
const Category = require('../models/Category');
// const imageMimeTypes = ['imgae/jpeg', 'image/png', 'image/gif'];

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
router.get('/new', ensureAuth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('products/new', { product: new Product(), categories: categories });
  } catch (error) {
    console.error('Cannot create new product');
  }
});

// @desc    Edit Product Page
// @route   GET products/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find({});
    res.render('products/edit', { product: product, categories: categories });
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
router.post('/', ensureAuth, async (req, res) => {
  const { name, description, category, msrp, price } = req.body;

  const product = new Product({
    name: name,
    category: category,
    description: description,
    msrp: msrp,
    price: price,
    // productImages: req.body.productImages,
  });
  // saveProduct(product, req.body.productImages);

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
router.put('/:id', ensureAuth, async (req, res) => {
  const { name, description, category, msrp, price } = req.body;

  let product;
  try {
    product = await Product.findById(req.params.id);
    product.name = name;
    product.category = category;
    product.description = description;
    product.msrp = msrp;
    product.price = price;
    // product.productImages = req.body.productImages;
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

/* function saveProduct(product, productEncoded) {
  if (productEncoded == null) return;
  const productImage = JSON.parse(productEncoded);
  if (product != null && imageMimeTypes.includes(productImage.type)) {
    product.productImages = new Buffer.from(productImage.data, 'bse64');
    product.productImages = productImage.type;
  }
}; */

module.exports = router;
