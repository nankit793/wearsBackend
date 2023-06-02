const mongoose = require("mongoose");

const Designs = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Design", Designs);
