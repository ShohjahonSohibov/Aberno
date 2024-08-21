const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  titleUz: { type: String },
  titleRu: { type: String },
  titleEn: { type: String },
  short_descriptionUz: { type: String },
  short_descriptionRu: { type: String },
  short_descriptionEn: { type: String },
  descriptionUz: { type: String },
  descriptionRu: { type: String },
  descriptionEn: { type: String },
  image: { 
    main_image: { type: String },
    images: { type: [String] }
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
