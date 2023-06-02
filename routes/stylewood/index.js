const express = require("express");
const app = express();

app.use("/p", require("./public"));
app.use("/a", require("./admin"));
module.exports = app;
