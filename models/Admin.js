const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Helper function to check if a password contains at least 4 words
function validatePassword(password) {
  return password.length >= 2;
}

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: false },
  phone: { type: String, required: false, unique: true },
  email: { type: String, required: false, unique: true },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: validatePassword,
      message: 'Password must contain at least 2 words.'
    }
  },
  profilePicture: { type: String },
  refreshToken: { type: String },
  lastVisit: { type: String },
  type: { type: String, enum: ['admin'], default: 'admin'},

}, {
  timestamps: true // Enable automatic createdAt and updatedAt fields
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Admin', adminSchema);
