const Category = require('../models/Category'); // Import your Category model

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category(req.body);
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCategories = async (req, res) => {
  try {
    const { isActive } = req.query;
    let query = {}
  
    if (isActive) {
      query["isActive"] = isActive
    } 

    const categories = await Category.find(query).populate({
      path: 'brand',
      match: { isActive: true }, // Only populate active brands
    });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSingleCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById({_id: id}).populate({
      path: 'brand',
      match: { isActive: true }, // Only populate active brands
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = await Category.findById({_id: id});
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.json({ message: 'Category updated successfully', category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById({_id: id});
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
