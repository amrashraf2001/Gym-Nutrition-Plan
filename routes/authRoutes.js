const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
const { check } = require("express-validator");
const { registerAuthentication } = require("../middleware/registerAuthentication");

router.post("/register", registerAuthentication(), authController.register);
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
  authenticateToken,
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