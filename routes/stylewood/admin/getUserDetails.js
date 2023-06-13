const express = require("express");
const adminVerification = require("@middlewares/adminVerification");
const app = express();
const {
  itemRequired,
  itemsNotValid,
  itemNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const Users = require("@models/user/UserSchema");

app.get("/", adminVerification, async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.json({ message: itemRequired("username", res) });
    }
    const user = await Users.findOne({ username }).select("blocked");
    if (!user) {
      return res.json({ message: userNotExist(res) });
    }
    if (user.blocked) {
      return res.status(400).json({ message: "You are blocked" });
    }
    res.status(200).json({ message: "user found", data: user });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
