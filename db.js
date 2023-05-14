const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.DATABASE_URI);
  console.log("Connetion to the database eshtablished");
} catch (error) {
  console.log(error);
}
