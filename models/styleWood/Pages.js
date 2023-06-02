const mongoose = require("mongoose");

const Pages = new mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  products: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
  },
});

module.exports = mongoose.model("pages", Pages);
