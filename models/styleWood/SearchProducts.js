const mongoose = require("mongoose");

const SearchProducts = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  desc: [
    {
      para: String,
    },
  ],
});

module.exports = mongoose.model("SearchProducts", SearchProducts);
