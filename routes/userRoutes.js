const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
const { check } = require("express-validator");
const { registerAuthentication } = require("../middleware/registerAuthentication");
const { uploadImage } = require("../middleware/multerConfig");
const imageToAVIF = require("../middleware/imageToAVIF");

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
    uploadImage.single("profilePicture"),
    imageToAVIF,
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

router.get(
    "/foods/page/:pageNum",
    bodyParser.json(),
    authenticateToken,
    userController.getAllFoods
)

router.get(
    "/foods/:foodName",
    bodyParser.json(),
    authenticateToken,
    userController.getFood
)
router.get(
    "/food/:foodId",
    bodyParser.json(),
    authenticateToken,
    userController.getFoodById
)

router.get(
    "/calculateBMI",
    bodyParser.json(),
    authenticateToken,
    userController.calculateBMI
)       

router.post(
    "/plans/createplan",
    bodyParser.json(),
    authenticateToken,
    userController.createPlan
)

router.get(
    "/getTrackedFoodById",
    bodyParser.json(),
    authenticateToken,
    userController.getTrackedFoodById
)

router.post(
    "/setTrackedFood",
    bodyParser.json(),
    authenticateToken,
    userController.setTrackedFood
)

router.get(
    "/randomTip",
    bodyParser.json(),
    authenticateToken,
    userController.randomTip
)

module.exports = router;