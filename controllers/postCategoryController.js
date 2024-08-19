const NewsCategory = require('../models/PostCategory'); // Import your Category model

// Create a new category
exports.createPostCategory = async (req, res) => {
  try {
    const newsCategory = new NewsCategory(req.body);
    await newsCategory.save();

    res.status(201).json({ message: 'NewsCategory created successfully', newsCategory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPostCategories = async (req, res) => {
  try {
    const { isActive } = req.query;
    let query = {}
  
    if (isActive) {
      query["isActive"] = isActive
    } 

    const categories = await NewsCategory.find(query);
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSinglePostCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const newsCategory = await NewsCategory.findById({_id: id});
    if (!newsCategory) {
      return res.status(404).json({ message: 'NewsCategory not found' });
    }

    res.json(newsCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updatePostCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await NewsCategory.findById({_id: id});
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.nameUz = req.body.nameUz || category.nameUz;
    category.nameRu = req.body.nameRu || category.nameRu;
    category.nameEn = req.body.nameEn || category.nameEn;
    category.isActive = req.body.isActive || category.isActive;
    
    await category.save();

    res.json({ message: 'Category updated successfully', category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deletePostCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await NewsCategory.findById({_id: id});
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

   await category.remove();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
