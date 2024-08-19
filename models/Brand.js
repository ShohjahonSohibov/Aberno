const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  nameUz: { type: String },
  nameRu: { type: String },
  nameEn: { type: String },
  category: { type: mongoose.Schema.Types.Mixed },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
