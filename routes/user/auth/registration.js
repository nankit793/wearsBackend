const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  userAlreadyExists,
  serverError,
} = require("@errors/general");
const USERS = require("@models/user/UserSchema");
const {
  emailVerification,
  passwordVerification,
} = require("@controllers/verifiers");
const { generateHash } = require("@controllers/bcrypt");
const { generateOTP } = require("@controllers/general");

app.post("/", async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    return res.json({
      message: itemsRequired("username, password, name", res),
    });
  }
  if (emailVerification(username) && passwordVerification(password) && name) {
    let user = await USERS.findOne({ username });
    if (user) {
      return res.status(403).json({ message: userAlreadyExists(res) });
    }
    user = await USERS(req.body);
    const hashedPassword = await generateHash(req.body.password);
    const OTP = generateOTP();
    const otpHash = await generateHash(OTP);
    if (hashedPassword && hashedPassword.hashed && otpHash && otpHash.hashed) {
      user.password = hashedPassword.hashed;
      user.verifyOTP = otpHash.hashed;
      //send mail to user
      await user.save();
      return res.status(200).json({
        message: "Please confirm the OTP for complete registration",
        otp: OTP,
      });
    }
    return res.status(401).json({ message: serverError("", res) });
  }
  return res.json({ message: itemsNotValid("username, password, name", res) });
});

module.exports = app;
