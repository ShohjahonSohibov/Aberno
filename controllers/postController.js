const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const {
      isActive,
      author,
      category,
      tag,
      brand,
      publishedStartTime,
      publishedEndTime,
      scheduledStartTime,
      scheduledEndTime,
      status,
    } = req.query;

    // Build the query object
    let query = {};

    if (isActive) {
      query.isActive = isActive
    }
    if (status) {
      query.status = status
    }
    if (author) {
      query.author = { $in: author.split(',') };
    }
    if (category) {
      query.category = { $in: category.split(',') };
    }
    if (tag) {
      query.tags = { $in: tag.split(',') };
    }
    if (brand) {
      query.brand = { $in: brand.split(',') };
    }
    if (publishedStartTime != undefined && publishedStartTime != "" || publishedEndTime !=  undefined && publishedEndTime != "") {
      query.publishedAt = {};
      if (publishedStartTime != undefined && publishedStartTime != "") {
        query.publishedAt.$gte = new Date(publishedStartTime);
      }
      if (publishedEndTime !=  undefined && publishedEndTime != "") {
        query.publishedAt.$lte = new Date(publishedEndTime);
      }
    }
    if (scheduledStartTime != undefined && scheduledStartTime != "" || scheduledEndTime != undefined && scheduledEndTime != "") {
      query.scheduledAt = {};
      if (scheduledStartTime != undefined && scheduledStartTime != "") {
        query.scheduledAt.$gte = new Date(scheduledStartTime);
      }
      if (scheduledEndTime != undefined && scheduledEndTime != "") {
        query.scheduledAt.$lte = new Date(scheduledEndTime);
      }
    }

    const posts = await Post.find(query)
      .populate('author', '_id username')
      .populate('category', '_id name')
      .populate('brand', '_id name')
      .populate('tags', '_id name')
      .sort({'_id': -1});

      res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('comments');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await post.save();
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is authorized to delete the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Delete the post
    await Post.findByIdAndDelete(req.params.id);

    // Return a success message
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};