const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  fullname: { type: String, required: false },
  title: { type: String, required: false },
  content: { type: String, required: false },
  image: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
