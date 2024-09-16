const User = require("../models/user");
const Food = require("../models/food");
const Plan = require("../models/plan");
const {handleServerError} = require("../utils/errorHandler");

const getUserId = async (req, res, next) => {
    const userName = req.query.userName
    const email = req.query.email
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "User ID Retrived successfully",
        userId: user._id,
    });

}

const getProfile = handleServerError( async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        message: "User profile Retrived successfully",
        user,
    });
});

const updateProfile =handleServerError( async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    //userId = userId.replace(/^"|"$/g, '');
    const newProfile = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.userName = newProfile.userName || user.userName;
    user.email = newProfile.email || user.email;
    user.gender = newProfile.gender || user.gender;
    user.age = newProfile.age || user.age;
    user.weight = newProfile.weight || user.weight;
    user.height = newProfile.height || user.height;
    user.bio = newProfile.bio || user.bio;
    user.profilePicture = newProfile.profilePicture || user.profilePicture;
    user.disease = newProfile.disease || user.disease;
    await user.save();
    res.json({
        message: "Profile updated successfully",
        // user,
    });
});

const getPlans =handleServerError( async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const user = await User.findById(userId).populate("listOfPlans");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "Plans Retrieved successfully",
        plans: user.listOfPlans,
    });
});

const getPlan = handleServerError( async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const user = await User.findById(userId);
    let planId = req.query.planId;
    planId = planId.replace(/^"|"$/g, '');
    const plan = await Plan.findById(planId);
    if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "Plan Retrieved successfully",
        plan,
    });
});

const setPlan = handleServerError( async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const { totalCalories, totalWeight, listOfTotalNutrients, listOfFoods } = req.body;

    const plan = new Plan({
        totalCalories,
        totalWeight,
        listOfTotalNutrients,
        listOfFoods
    });

    await plan.save();
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.listOfPlans.push(plan._id);
    await user.save();

    res.json({
        message: "Plan created and saved successfully",
        plan
    });
});

const getRandomPlans = handleServerError(async (req, res, next) => {
    const plans = await Plan.aggregate([{ $sample: { size: 3 } }]);
    res.json({
        message: "Random plans retrived successfully",
        plans,
    });

});

const deletePlan = handleServerError(async (req, res, next) => {    
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    let planId = req.body.planId;
    //userId = userId.replace(/^"|"$/g, '');
    planId = planId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const planIndex = user.listOfPlans.indexOf(planId);
    if (planIndex === -1) {
        return res.status(404).json({ message: "Plan not found" });
    }
    user.listOfPlans.splice(planIndex, 1);
    await user.save();
    await Plan.findByIdAndDelete(planId);
    res.json({
        message: "Plan deleted successfully",
    });
});

const getAllFoods = handleServerError(async (req, res) => {
    if (!req.currentUser) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    let pageNum = parseInt(req.params.pageNum);
    if (isNaN(pageNum)) {
        return res.status(400).json({ message: "Invalid page number" });
    }
    let limit = req.query.limit && !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
    let skip = (pageNum * limit) - limit;
    // console.log(parseInt(req.params.pageNum));
    const foods = await Food.find().skip(skip).limit(limit);
    // console.log(req.currentUser)
    res.json({
        message: "Foods retrieved successfully",
        foods,
    });
});

const getFood = handleServerError(async (req, res, next) => {
    // Check if the current user is authorized
    if (!req.currentUser) {
        return res.status(403).json({ message: "Unauthorized user" });
    }

    // Extract and sanitize the food name from request parameters
    let foodName = req.params.foodName.replace(/^"|"$/g, '');

    // Check if the page number is valid
    let pageNum = parseInt(req.query.page);
    if (isNaN(pageNum) || pageNum <= 0) {
        return res.status(400).json({ message: "Invalid page number" });
    }

    // Set the limit and calculate the skip value
    let limit = req.query.limit && !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
    let skip = (pageNum - 1) * limit;

    // Find food matching the name using case-insensitive regex
    const food = await Food.find({ name: new RegExp(`^${foodName}`, 'i') }).skip(skip).limit(limit);

    // Check if any food items were found
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }

    // Return the found food items
    res.json({
        message: "Food retrieved successfully",
        food,
    });
});


const calculateBMI = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const weight = user.weight;
    const height = user.height;
    const BMI = weight / (height * height);

    res.json({
        message: "BMI calculated successfully",
        BMI,
    });
});

const calculateCalories = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const weight = user.weight;
    const height = user.height;
    const age = user.age;

    const BMR = 10 * weight + 6.25 * height - 5 * age;
    const calories = BMR * 1.2;

    res.json({
        message: "Calories calculated successfully",
        calories,
    });

});




module.exports = {
    getUserId,
    getProfile,
    updateProfile,
    getPlans,
    getPlan,
    setPlan,
    getRandomPlans,
    deletePlan,
    getAllFoods,
    getFood,
    calculateBMI,
    calculateCalories,

};