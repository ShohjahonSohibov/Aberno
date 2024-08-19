const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  nameUz: { type: String },
  nameRu: { type: String },
  nameEn: { type: String },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
