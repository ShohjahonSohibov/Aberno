const Product = require('../models/Product'); 

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10, search, sortRate = 'asc', sortByCreatedAt = 'desc'  } = req.query;
    let query = {}
  
    if (isActive) {
      query["isActive"] = isActive
    } 

    if (search) {
      query["title"] = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const skip = (page - 1) * limit;

    let sort = {};
    sort['createdAt'] = sortByCreatedAt === 'asc' ? 1 : -1;
    if (sortRate) {
      sort['rate'] = sortRate === 'asc' ? 1 : -1;
    }

    const products = await Product.find(query)
    .populate({
      path: 'category',
      match: { isActive: true }, 
    })
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);

    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById({_id: req.params.id}).populate('category');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { title, short_description, description, image, category, isActive } = req.body;

    const product = await Product.findById({_id: req.params.id});

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title || product.title;
    product.short_description = short_description || product.short_description;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.isActive = typeof isActive !== 'undefined' ? isActive : product.isActive;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({_id: req.params.id});

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};


