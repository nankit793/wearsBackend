require("module-alias/register");
require("./db");
var bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config({
  path: "./dev.env",
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser(process.env.COOKIE_VERIFY_SECRET));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/user/index"));

// routes to handle
app.use("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(port, () => {
  console.log(`Listening at Port: ${port}`);
});
