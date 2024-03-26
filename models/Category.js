// Importing mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Extracting the Schema class from mongoose
const Schema = mongoose.Schema;

// Defining the schema for the category collection
const categorySchema = mongoose.Schema({
  // Defining the 'name' field with type String, which is required
  name: {
    type: String,
    required: true,
  },
  // Defining the 'parentCategory' field with type String
  parentCategory: {
    type: String,
  },
});

// Exporting the mongoose model for the 'Category' collection,
// using the categorySchema defined above
module.exports = mongoose.model('Category', categorySchema);
