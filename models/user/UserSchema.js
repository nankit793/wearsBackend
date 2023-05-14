const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  name: String,
  accountVerfication: { type: Boolean, default: false },
  verifyOTP: {
    type: String,
    select: false,
  },
  forgotPassOTP: {
    type: String,
    default: null,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
