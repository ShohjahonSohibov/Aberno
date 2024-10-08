const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nameUz: { type: String },
  nameRu: { type: String },
  nameEn: { type: String },
  image: { type: String },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
