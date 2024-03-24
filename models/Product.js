const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  description: {
    type: String,
    required: true,
  },
  msrp: {
    type: Number,
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
