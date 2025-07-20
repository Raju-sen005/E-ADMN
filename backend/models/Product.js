const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: { type: String }, // should be a URL or file path
  sellPrice: { type: Number  },
   discountPrice: { type: Number  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
