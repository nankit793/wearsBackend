const express = require("express");
const app = express();

app.use("/addProduct", require("./product/addProduct"));
app.use("/editProduct", require("./product/editProduct"));
app.use("/register", require("./singOn/register"));
app.use("/login", require("./singOn/login"));
// app.use("/getInfo", require("./getInfo"));
module.exports = app;
