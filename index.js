require("module-alias/register");
require("./db");
var bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("@controllers/generateTokens");
const port = process.env.PORT || 5000;
const app = express();
const USERS = require("@models/user/UserSchema");

require("dotenv").config({
  path: "./dev.env",
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const payload = {
        username: profile.emails[0].value,
      };
      let user = await USERS.findOne({ username: profile.emails[0].value });
      if (!user) {
        user = await USERS({
          username: profile.emails[0].value,
          name: profile.displayName,
          accountVerfication: true,
        });
        await user.save();
      }
      // Generate JWT token
      const token = generateRefreshToken({ payload });
      done(null, token);
    }
  )
);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token = await req.user;
    // Redirect the user to the frontend with the JWT token as a query parameter
    console.log(token, "request mode");
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

app.use(cookieParser(process.env.COOKIE_VERIFY_SECRET));
app.use(bodyParser.json());
app.use("*", cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/user", require("./routes/user/index"));

// routes to handle
app.use("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(port, () => {
  console.log(`Listening at Port: ${port}`);
});
