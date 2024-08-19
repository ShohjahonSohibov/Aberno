const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  name: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
