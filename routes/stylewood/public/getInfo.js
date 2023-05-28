const express = require("express");
const userVerification = require("@middlewares/userVerification");
const app = express();
const { serverError } = require("@errors/general");
app.post("/", userVerification, async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "information retrieved", data: req.user });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
