const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
const { check } = require("express-validator");

router.post("/signUp", bodyParser.json(), authController.signUp);
router.post("/login", bodyParser.json(), authController.login);
router.post(
  "/logout",
  authenticateToken,
  bodyParser.json(),
  authController.logout
);
router.post(
  "/forgotUsername",
  bodyParser.json(),
  authController.forgetUsername
);
router.post(
  "/forgotPassword",
  bodyParser.json(),
  authController.forgetPassword
);
router.get(
  "/generateUsernames",
  bodyParser.json(),
  authController.generateUserName
);
router.patch(
  "/updatePassword",
  bodyParser.json(),
  authController.updatePassword
);
router.patch(
  "/email",
  bodyParser.json(),
  authenticateToken,
  authController.updateEmail
);


  router.patch(
    "/changePassword",
    bodyParser.json(),
    authenticateToken,
    authController.changePassword
  );
  
  module.exports = router;