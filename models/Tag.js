const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  nameUz: { type: String },
  nameRu: { type: String },
  nameEn: { type: String },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);
