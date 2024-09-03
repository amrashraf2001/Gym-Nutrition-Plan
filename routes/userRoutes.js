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

router.patch(
    "/updateProfile",
    bodyParser.json(),
    authenticateToken,
    userController.updateProfile
  );

router.get(
    "/plans",
    bodyParser.json(),
    authenticateToken,
    userController.getPlans
  );

router.get(
    "/getPlan",
    bodyParser.json(),
    authenticateToken,
    userController.getPlan
)

router.post(
    "/setPlan",
    bodyParser.json(),
    authenticateToken,
    userController.setPlan
)

router.get(
    "/getRandomPlan",
    bodyParser.json(),
    authenticateToken,
    userController.getRandomPlans
)

router.delete(
    "/deletePlan",
    bodyParser.json(),
    authenticateToken,
    userController.deletePlan
)

module.exports = router;