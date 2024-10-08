const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titleUz: { type: String },
  titleRu: { type: String },
  titleEn: { type: String },
  contentUz: { type: String },
  contentRu: { type: String },
  contentEn: { type: String },
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post_category' }],
  brand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: String, default: Date.now },
  scheduledAt: { type: String },
  status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
