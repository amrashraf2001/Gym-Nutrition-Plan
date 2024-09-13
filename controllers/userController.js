const User = require("../models/user");
const Food = require("../models/food");
const Plan = require("../models/plan");


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

const getProfile = async (req, res, next) => {
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
}

const updateProfile = async (req, res, next) => {
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
}

const getPlans = async (req, res, next) => {
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
        message: "Plans Retrived successfully",
        plans: user.listOfPlans,
    });
}

const getPlan = async (req, res, next) => {
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
        message: "Plan Retrived successfully",
        plan,
    });
}

const setPlan = async (req, res, next) => {
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
}

const getRandomPlans = async (req, res, next) => {
    const plans = await Plan.aggregate([{ $sample: { size: 3 } }]);
    res.json({
        message: "Random plans retrived successfully",
        plans,
    });

}

const deletePlan = async (req, res, next) => {
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
}

const getAllFood = async (req, res) => {
    const foods = await Food.find();
    if (!req.currentUser) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    // console.log(req.currentUser)
    res.json({
        message: "Foods retrieved successfully",
        foods,
    });
}

const getFood = async (req, res, next) => {
    let foodId = req.query.foodId;
    foodId = foodId.replace(/^"|"$/g, '');
    const food = await Food.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }
    res.json({
        message: "Food retrived successfully",
        food,
    });
}

const calculateBMI = async (req, res, next) => {
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
}

const calculateCalories = async (req, res, next) => {
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

}




module.exports = {
    getUserId,
    getProfile,
    updateProfile,
    getPlans,
    getPlan,
    setPlan,
    getRandomPlans,
    deletePlan,
    getAllFood,
    getFood,
    calculateBMI,
    calculateCalories,

};