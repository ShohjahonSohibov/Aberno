const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Helper function to check if a password contains at least 2 words
function validatePassword(password) {
  const words = password;
  console.log(words)
  return words.length >= 2;
}

const userSchema = new mongoose.Schema({
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
}, {
  timestamps: true // Enable automatic createdAt and updatedAt fields
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
