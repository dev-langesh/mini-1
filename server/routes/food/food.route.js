const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authenticateToken");
const {
  openFoodRegisteration,
  chooseFoodItem,
  closeFoodRegisteration,
  getAllRecords,
} = require("./food.controller");

router.get("/", authenticateToken, getAllRecords);
router.put("/open-registeration", authenticateToken, openFoodRegisteration);
router.put("/close-registeration", authenticateToken, closeFoodRegisteration);
router.put("/choose-food-item", authenticateToken, chooseFoodItem);

module.exports = { foodRouter: router };
