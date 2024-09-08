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
      query["titleUz"] = { $regex: search, $options: 'i' }; // Case-insensitive search
      query["titleRu"] = { $regex: search, $options: 'i' }; // Case-insensitive search
      query["titleEn"] = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const skip = (page - 1) * limit;

    let sort = {};
    sort['_id'] = sortByCreatedAt === 'asc' ? 1 : -1;
    if (sortRate) {
      sort['rate'] = sortRate === 'asc' ? 1 : -1;
    }

    const products = await Product.find(query)
    .populate({
      path: 'category',
      match: { isActive: true },
      populate: {
        path: 'brand', 
        select: 'nameUz nameRu nameEn _id'
      }
    })
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);
  
    const counts = await Product.countDocuments(query)

    res.status(200).json({products});
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

    const product = await Product.findById({_id: req.params.id});

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.titleUz = req.body.titleUz || product.titleUz;
    product.titleRu = req.body.titleRu || product.titleRu;
    product.titleEn = req.body.titleEn || product.titleEn;
    product.short_descriptionUz = req.body.short_descriptionUz || product.short_descriptionUz;
    product.short_descriptionRu = req.body.short_descriptionRu || product.short_descriptionRu;
    product.short_descriptionEn = req.body.short_descriptionEn || product.short_descriptionEn;
    product.descriptionUz = req.body.descriptionUz || product.descriptionUz;
    product.descriptionRu = req.body.descriptionRu || product.descriptionRu;
    product.descriptionEn = req.body.descriptionEn || product.descriptionEn;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
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


