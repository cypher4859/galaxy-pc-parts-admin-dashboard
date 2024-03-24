const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: String,
  },
});

module.exports = mongoose.model('Category', categorySchema);
