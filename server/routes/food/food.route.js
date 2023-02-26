const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authenticateToken");
const { openFoodRegisteration } = require("./food.controller");

router.put("/open-registeration", authenticateToken, openFoodRegisteration);

module.exports = { foodRouter: router };
