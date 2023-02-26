const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authenticateToken");
const {
  openFoodRegisteration,
  chooseFoodItem,
  closeFoodRegisteration,
} = require("./food.controller");

router.put("/open-registeration", authenticateToken, openFoodRegisteration);
router.put("/close-registeration", authenticateToken, closeFoodRegisteration);
router.put("/choose-food-item", authenticateToken, chooseFoodItem);

module.exports = { foodRouter: router };
