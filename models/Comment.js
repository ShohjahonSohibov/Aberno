const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rate: { type: Number, required: false },
  isActive: { type: Boolean, required: true, default: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
