const { Router } = require("express");
const controller = require("./status.controller");

const router = Router();

router.get("/", controller.getStatus);

module.exports = router;
