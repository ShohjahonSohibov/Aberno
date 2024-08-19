const Brand = require("../models/Brand"); // Import your Category model
const Category = require("../models/Category");

// Create a new category
exports.createBrand = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brand = new Brand({ name });
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
      const categories = await Category.findOne(query);
      brands[i].category = {_id: categories.id, name: categories.name};
      console.log(brands[i].category)
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
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const brand = await Brand.findById({ _id: id });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.name = name;
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
