const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authenticateToken");
const { openFoodRegisteration, chooseFoodItem } = require("./food.controller");

router.put("/open-registeration", authenticateToken, openFoodRegisteration);
router.put("/choose-food-item", authenticateToken, chooseFoodItem);

module.exports = { foodRouter: router };
