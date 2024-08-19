const Tag = require('../models/Tag'); // Import your Tag model

// Create a new tag
exports.createTag = async (req, res) => {
  const { name } = req.body;

  try {
    // Ensure the name is provided
    if (!name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    // Check if the tag already exists
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: 'Tag already exists' });
    }

    // Create and save the new tag
    const tag = new Tag(req.body);
    await tag.save();

    res.status(201).json({ message: 'Tag created successfully', tag });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all tags
exports.getTags = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10} = req.query;

    let query = {}
  
    if (isActive) {
      query["isActive"] = isActive
    }

    const skip = (page - 1) * limit;

    const tags = await Tag.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({'_id': -1});
    
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single tag
exports.getSingleTag = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the tag by ID
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a tag
exports.updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // Ensure the name is provided
    if (!name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    // Find the tag by ID
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Update the tag
    tag.name = name;
    await tag.save();

    res.json({ message: 'Tag updated successfully', tag });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
}

// Delete a tag
exports.deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the tag
    const tag = await Tag.findById({_id: id});
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await tag.remove();
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};