const express = require("express");
const routerProduct = express.Router();

const upload = require("../middlewares/upload");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBytype
} = require("../Controller/productController");

const Product = require("../models/ProductSchema");

routerProduct.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createProduct
);

routerProduct.get("/", getAllProducts);

// ✅ route مؤقت لمعرفة الـ types الموجودة في الـ DB
routerProduct.get("/alltypes", async (req, res) => {
  try {
    const types = await Product.distinct("type");
    const count = await Product.countDocuments();
    res.json({ totalProducts: count, types });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

routerProduct.get("/type/:type", getProductBytype);
routerProduct.get("/:id", getProductById);
routerProduct.put("/:id", updateProduct);
routerProduct.delete("/:id", deleteProduct);

module.exports = routerProduct;