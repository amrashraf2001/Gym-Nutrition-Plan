const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");
const { checkUserName, checkEmail, checkPassword, checkGender , checkEmailOrUserName} = require("../middleware/registerAuthentication");

router.post("/register", checkUserName() , checkEmail() , checkPassword() ,checkGender(),authController.register);
router.post("/login", checkEmailOrUserName(),checkPassword() , authController.login);
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
  checkPassword().confirmPassword(),
  authenticateToken,
  authController.updatePassword
);
router.patch(
  "/email",
  checkEmail() , checkPassword(),
  authenticateToken,
  authController.updateEmail
);


  router.patch(
    "/changePassword",
    checkPassword().confirmPassword().compareOldPasswords(),
    authenticateToken,
    authController.changePassword
  );
  
  module.exports = router;