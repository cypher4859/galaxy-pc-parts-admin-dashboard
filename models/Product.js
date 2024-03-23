const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  //Product Image Schema
  /* productImages: {
    type: [Buffer],
    required: true,
  },
  productImageType: {
    type: String,
    required: true,
  }, */
});

/* productSchema.virtual('productImagesPath').get(function () {
  if (this.productImages != null && this.productImageType != null) {
    return `data:${this.productImageType};charset=utf-8;base64,${this.productImages.toString('base64')}`;
  }
}); */

module.exports = mongoose.model('Product', productSchema);
