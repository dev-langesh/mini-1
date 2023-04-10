const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authenticateToken");
const {
  openFoodRegisteration,
  chooseFoodItem,
  closeFoodRegisteration,
  getAllRecords,
  getFoodCode,
} = require("./food.controller");

router.get("/", getAllRecords);
router.get("/code", authenticateToken, getFoodCode);
router.put("/open-registeration", authenticateToken, openFoodRegisteration);
router.put("/close-registeration", authenticateToken, closeFoodRegisteration);
router.post("/choose-food-item", authenticateToken, chooseFoodItem);

module.exports = { foodRouter: router };
