const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const { attachCokiesToRes } = require("@controllers/general");
const USERS = require("@models/user/UserSchema");
const {
  emailVerification,
  passwordVerification,
} = require("@controllers/verifiers");
const { compareHash } = require("@controllers/bcrypt");

app.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        message: itemsRequired("username, password", res),
      });
    }
    if (emailVerification(username) && passwordVerification(password)) {
      let user = await USERS.findOne({ username });
      if (!user) {
        return res.status(403).json({ message: userNotExist(res) });
      }
      if (user && user.accountVerfication) {
        const passwordCompare = await compareHash(
          req.body.password,
          user.password
        );
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ message: "Invalid Username or Password" });
        }
        const payload = {
          id: user.id,
          username: user.username,
        };
        await attachCokiesToRes(res, payload);
        return res.status(200).json({ message: "successfull login" });
      } else {
        return res
          .status(403)
          .json({ message: "your account is not verified" });
      }
    }
    return res.json({
      message: itemsNotValid("username, password, name", res),
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
