const mongoose = require("mongoose");

const ProductImages = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model("productImages", ProductImages);
