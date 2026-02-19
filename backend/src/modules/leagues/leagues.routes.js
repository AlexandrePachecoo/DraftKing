const { Router } = require("express");
const controller = require("./leagues.controller");
const authMiddleware = require("../../shared/middlewares/auth.middleware");

const router = Router();

router.post("/", authMiddleware, controller.postCreateLeague);

module.exports = router;
