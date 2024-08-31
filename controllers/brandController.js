const Brand = require("../models/Brand"); // Import your Category model
const Category = require("../models/Category");

// Create a new category
exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();

    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getBrands = async (req, res) => {
  try {
    const { isActive } = req.query;
    let query = {};

    if (isActive) {
      query["isActive"] = isActive;
    }

    const brands = await Brand.find(query);
    res.json(brands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.getFilterBrands = async (_, res) => {
  try {
    let query = {}
    query["isActive"] = true;

    const brands = await Brand.find(query);
    for (let i = 0; i < brands.length; i++) {
      query["brand"] = brands[i]._id
      const categories = await Category.find(query);
      categories.forEach(category => {
        brands[i].category.push(category);
      });
    }
    res.json(brands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getSingleBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById({ _id: id });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a category
exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById({ _id: id });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.nameUz = req.body.nameUz;
    brand.nameRu = req.body.nameRu;
    brand.nameEn = req.body.nameEn;
    brand.isActive = req.body.isActive;

    await brand.save();

    res.json({ message: "Brand updated successfully", brand });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById({ _id: id });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await Category.updateMany(
      { brand: id },
      { $unset: { brand: "" } } // or you can use $pull if brand is an array in categories
    );

    await brand.remove();
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
