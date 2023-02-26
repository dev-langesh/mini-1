const router = require("express").Router();
const { register, login, verifyCode } = require("./user.controller");

router.post("/register", register);
router.post("/login", login);
router.put("/verify-code", verifyCode);

module.exports = { userRouter: router };
