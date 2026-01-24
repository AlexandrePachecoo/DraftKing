const express = require("express");
const app = express();

const statusRoutes = require("./src/modules/status/status.routes");
const registerRoutes = require("./src/modules/register/register.routes");

app.use(express.json());
app.use("/status", statusRoutes);
app.use("/register", registerRoutes);

module.exports = app;
