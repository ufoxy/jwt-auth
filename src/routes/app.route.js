const express = require("express");
const router = express.Router();
const appController = require("../controllers/app.controller");
const { verifyToken, verifyPermission } = require("../services/jwt.service");

router.get("/:user", verifyToken, verifyPermission, appController.userBooks);

module.exports = router