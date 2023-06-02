const mongoose = require("mongoose");
const Designs = require("./Designs");
const ProductsSchema = new mongoose.Schema({
  // product display
  name: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 400,
  },
  images: {
    type: [{ name: String, image: mongoose.Schema.Types.ObjectId }],
  },
  // searching
  tags: {
    type: String,
    required: true,
    default: "general",
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
  },

  colors: {
    type: [String],
  },
  sizes: {
    type: [String],
  },
  inStock: { type: Boolean, default: true },
  design: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designs",
    // required: true,
  },
});

module.exports = mongoose.model("product", ProductsSchema);
