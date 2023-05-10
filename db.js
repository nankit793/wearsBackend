const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const app = express();

try {
  app.use(
    session({
      secret: "Our little secret.",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  mongoose.connect(process.env.DATABASE_URI);
  console.log("Connetion to the database eshtablished");
} catch (error) {
  console.log(error);
}
// mongoose.set("useCreateIndex", true);
