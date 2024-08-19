const Admin = require('../models/Admin');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Product = require('../models/Product');

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    console.log(newComment)
    if (req.body.post != "") {
      console.log("inside post")
      await Post.findByIdAndUpdate(req.body.post, { $push: { comments: newComment._id } });
      console.log("after inside post")
    }
    if (req.body.productd != "") {
      await Product.findByIdAndUpdate(req.body.productd, { $push: { comments: newComment._id } });
    }
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId, productId, isActive, page = 1, limit = 10, sortRate = 'asc', sortByCreatedAt = 'desc' } = req.query;
    let query = {};
    
    if (isActive) {
      query["isActive"] = isActive
    } 
    if (postId != "" && postId != undefined) {
      query["post"] = postId
    } 
  
    if (productId != "" && productId != undefined) {
      query["product"] = productId
    } 
  
    const skip = (page - 1) * limit;

    let sort = {};
    sort['createdAt'] = sortByCreatedAt === 'asc' ? 1 : -1;
    if (sortRate) {
      sort['rate'] = sortRate === 'asc' ? 1 : -1;
    }
    console.log(query)
    const comments = await Comment.find(query)
    .populate('author')
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);

    const counts = await Comment.countDocuments(query)


    res.status(200).json({counts, comments});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Get a single comment
exports.getSingleComment = async (req, res) => {
  try {
    const comment = await Comment.findById({_id: req.params.id}).populate('author');
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comment', error });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content, rate, isActive } = req.body;

  const existComment = await Comment.findById({_id: id});
  if (!existComment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (existComment.isActive != isActive) {
    const admin = await Admin.findById({_id: req.user_id});
    if (!admin) {
      return res.status(404).json({ message: 'User is not admin not change status comment' });
    }
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate({_id: id}, { content, rate, isActive }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete({_id: req.params.id});
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Post.findByIdAndUpdate(deletedComment.post, { $pull: { comments: deletedComment._id } });
    
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};
