const express = require("express");
const app = express();

app.use("/v1", require("./stylewood/index"));
module.exports = app;
