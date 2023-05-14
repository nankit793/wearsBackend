const express = require("express");
const app = express();

app.use("/auth/google/siginOn", require("./auth/google"));
app.use("/auth/registration", require("./auth/registration"));
app.use("/auth/login", require("./auth/login"));
app.use("/auth/verifyAccount", require("./auth/verifyAccount"));
app.use("/auth/forgotPassword", require("./auth/forgotPassword"));
app.use("/auth/regenrateVerifyOTP", require("./auth/regenrateVerifyOTP"));
app.use("/auth/regenrateFPotp", require("./auth/regenrateFPotp"));

module.exports = app;
