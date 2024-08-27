const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const signupAuthenticate = require("../middleware/signupAuthenticate");
// const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");

router.post(
  "/signUp",
  signupAuthenticate,
  authController.signUp
);
router.post(
  "/login", 
  authController.login
);
router.post(
  "/logout",
  authenticateToken,
  authController.logout
);
router.post(  // this function is not necessary and can be removed
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