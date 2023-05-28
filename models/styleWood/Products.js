const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // tags: {
  //   type: String,
  //   required: true,
  // },
  // desc: {
  //   type: String,
  //   required: true,
  // },
  price: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", ProductsSchema);
