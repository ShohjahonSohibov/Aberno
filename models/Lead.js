const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String },
  phone: { type: String },
  email: { type: String },
  status: { type: String, enum: ['new', 'called', 'rejected', 'interested'], default: 'new' },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
