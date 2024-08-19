const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/config');
const Admin = require('../models/Admin');

// Generate a new access token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '365d' });
};

const generateTokenAdmin = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { phone, email, password } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log(phone, email, password)
    user = new User({ phone, email, password });
    await user.save();

    const token = generateToken(user.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    await user.save();

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("admin:", admin._id)
    const token = generateTokenAdmin(admin._id);
    const refreshToken = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '60d' });

    admin.refreshToken = refreshToken;
    await admin.save();

    res.json({ token, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({'error': err?.message});
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded.id, refreshToken });

    if (!admin) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const token = generateToken(admin._id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
