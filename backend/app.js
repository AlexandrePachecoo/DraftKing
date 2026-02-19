const express = require("express");
const app = express();

const statusRoutes = require("./src/modules/status/status.routes");
const registerRoutes = require("./src/modules/register/register.routes");
const loginRoutes = require("./src/modules/login/login.routes");
const leaguesRoutes = require("./src/modules/leagues/leagues.routes");

app.use(express.json());
app.use("/status", statusRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/leagues", leaguesRoutes);

module.exports = app;
