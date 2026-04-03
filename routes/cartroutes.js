const express = require("express");
const cartrouter = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require("../Controller/cartController");

cartrouter.post("/", addToCart);
cartrouter.get("/:userId", getCart);
cartrouter.put("/:userId/:productId", updateCartItem);
cartrouter.delete("/:userId/:productId", removeFromCart);
cartrouter.delete("/:userId", clearCart);

module.exports = cartrouter;