const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true
  },

  size: {
    type: String,
    required: true,
    enum: ["S", "M", "L", "XL"] 
  },

  color: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  image2: {
    type: String
  },

  image3: {
    type: String
  },

  type: {
  type: String,
  required: true,
  enum: [
    "shirt",
    "pants",
    "shoes",
    "jacket",
    "accessories",
    "sportsequipment"
  ]
}

},
 {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);