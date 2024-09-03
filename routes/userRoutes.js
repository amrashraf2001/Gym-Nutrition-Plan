const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
const { check } = require("express-validator");
const { registerAuthentication } = require("../middleware/registerAuthentication");

router.get(
    "/getUserId",
    bodyParser.json(),
    authenticateToken,
    userController.getUserId
)

router.get(
    "/profile",
    bodyParser.json(),
    authenticateToken,
    userController.getProfile
  );

module.exports = router;