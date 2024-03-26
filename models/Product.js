// Importing mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Extracting the Schema class from mongoose
const Schema = mongoose.Schema;

// Defining the schema for the product collection
const productSchema = mongoose.Schema({
  // Defining the 'name' field with type String, which is required
  name: {
    type: String,
    required: true,
  },
  // Defining the 'category' field with type ObjectId, referencing the 'Category' model
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  // Defining the 'description' field with type String, which is required
  description: {
    type: String,
    required: true,
  },
  // Defining the 'msrp' (Manufacturer's Suggested Retail Price) field with type Number, which is required
  msrp: {
    type: Number,
    required: true,
  },
  // Defining the 'price' field with type Number, which is required
  price: {
    type: Number,
    required: true,
  },
});

// Exporting the mongoose model for the 'Product' collection,
// using the productSchema defined above
module.exports = mongoose.model('Product', productSchema);
