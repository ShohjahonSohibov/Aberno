const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/config');
console.log("MONGO_URI:", MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
