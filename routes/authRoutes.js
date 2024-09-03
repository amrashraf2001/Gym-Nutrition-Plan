const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
const { check } = require("express-validator");
const { registerAuthenticate } = require("../middleware/registerAuthenticate");

router.post("/register", registerAuthenticate(), authController.register);
router.post("/login", authController.login);
router.post(
  "/logout",
  authenticateToken,
  authController.logout
);
router.post(
  "/forgotUsername",
  authController.forgetUsername
);
router.post(
  "/forgotPassword",
  authController.forgetPassword
);
router.get(
  "/generateUsernames",
  authController.generateUserName
);
router.patch(
  "/updatePassword",
  authController.updatePassword
);
router.patch(
  "/email",
  authenticateToken,
  authController.updateEmail
);


  router.patch(
    "/changePassword",
    authenticateToken,
    authController.changePassword
  );
  
  module.exports = router;