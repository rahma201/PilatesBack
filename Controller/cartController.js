const Cart = require("../models/cartSchema");
const Product = require("../models/ProductSchema");

// add cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required"
      });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        products: [
          {
            product: productId,
            quantity: quantity || 1
          }
        ]
      });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity || 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: quantity || 1
        });
      }

      await cart.save();
    }

    res.status(200).json({
      message: "Product added to cart successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

// get user cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    res.status(200).json({
      message: "Cart found",
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

// update quantity
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

// delete  cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

// clear cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
};