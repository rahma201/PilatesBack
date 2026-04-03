const Product = require("../models/ProductSchema");

const createProduct = async (req, res) => {
  try {
    const { name, price, size, color, type } = req.body;

    // 👇 هنا المكان الصحيح
    const image = req.files?.image?.[0]
      ? `http://localhost:5000/uploads/${req.files.image[0].filename}`
      : null;

    const image2 = req.files?.image2?.[0]
      ? `http://localhost:5000/uploads/${req.files.image2[0].filename}`
      : "";

    const image3 = req.files?.image3?.[0]
      ? `http://localhost:5000/uploads/${req.files.image3[0].filename}`
      : "";

    if (!name || !price || !size || !color || !image || !type) {
      return res.status(400).json({
        message: "required data from body",
      });
    }

    const product = await Product.create({
      name,
      price,
      size,
      color,
      image,   // 👈 هنا يتم حفظ الرابط الصحيح
      image2,
      image3,
      type,
    });

    res.status(201).json({
      message: "New product was created",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "All products",
      data: products
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product found",
      data: product
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

const getProductBytype = async (req, res) => {
  try {
    const { type } = req.params;

    const products = await Product.find({ type });

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found for this type"
      });
    }

    res.status(200).json({
      message: "Products found",
      data: products
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: product
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBytype
};
