const express = require("express");
const app = express();

const statusRoutes = require("./src/modules/status/status.routes");

app.use("/status", statusRoutes);

module.exports = app;
