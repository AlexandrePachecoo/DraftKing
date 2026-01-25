const { Router } = require("express");
const controller = require("./login.controller");

const router = Router();

router.post("/", controller.postLogin);

module.exports = router;
