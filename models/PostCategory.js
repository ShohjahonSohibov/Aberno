const mongoose = require('mongoose');

const postCategorySchema = new mongoose.Schema({
  nameUz: { type: String },
  nameRu: { type: String },
  nameEn: { type: String },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('post_category', postCategorySchema);
