const express = require("express");
const app = express();

app.use("/updateInfo", require("./updateInfo"));
app.use("/getInfo", require("./getInfo"));
app.use("/getProduct", require("./product/getProduct"));
module.exports = app;
