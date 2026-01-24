const { Router } = require("express");
const controller = require("./register.controller");

const router = Router();

router.post("/", controller.postRegister);

module.exports = router;
