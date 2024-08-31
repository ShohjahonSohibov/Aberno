const User = require('../models/User');
const Post = require('../models/Post');
const Admin = require('../models/Admin');

// USER
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById({_id: req.params.id});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;
    const user = await User.findById({_id: req.params.id});

    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    console.log(req.body)
    if (req.user.id !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.password = password || user.password;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById({_id: req.params.id});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await User.findByIdAndDelete({_id: user.id});

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ADMIN

exports.createAdmin = async (req, res) => {
  const { username, fullname, phone, password } = req.body;

  try {
    if (!username || !fullname || !phone || !password) {
      return res.status(400).json({ message: 'All Fields is required' });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin(req.body);
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const user = await Admin.findById({_id: req.params.id});
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const { username, fullname, phone, email, bio, profilePicture } = req.body;
    const user = await User.findById({_id: req.params.id});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const user = await Admin.findById({_id: req.params.id});

    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Admin.findByIdAndDelete({_id: user.id});

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};