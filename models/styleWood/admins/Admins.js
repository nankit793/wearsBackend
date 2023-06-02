const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  name: String,
  role: {
    type: String,
    enum: ["super", "product", "stock"],
    default: "product",
  },
});

module.exports = mongoose.model("admin", AdminSchema);
