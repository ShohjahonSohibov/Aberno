const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: false },
  short_description: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
