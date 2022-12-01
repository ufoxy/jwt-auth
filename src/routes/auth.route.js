const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyRefreshToken } = require("../services/jwt.service")

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh", verifyRefreshToken, authController.refresh)

module.exports = router;
