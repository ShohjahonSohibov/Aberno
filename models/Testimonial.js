const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  fullnameUz: { type: String },
  fullnameRu: { type: String },
  fullnameEn: { type: String },
  titleUz: { type: String },
  titleRu: { type: String },
  titleEn: { type: String },
  contentUz: { type: String },
  contentRu: { type: String },
  contentEn: { type: String },
  image: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
