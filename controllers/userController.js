const User = require("../models/user");
const Food = require("../models/food");
const Plan = require("../models/plan");


const getUserId = async (req, res, next) => {
    const userName = req.query.userName
    const email = req.query.email
    const user = await User.findOne({$or:[{ email }, { userName }]});
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "User ID Retrived successfully",
        userId: user._id,
      });

}

const getProfile = async (req, res, next) => {
    const userId = req.userId;
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
    const userId = req.userId;
    const newProfile = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.userName = newProfile.userName || user.userName;
    user.email = newProfile.email || user.email;
    user.gender = newGender || user.gender;
    user.age = newProfile.age || user.age;
    user.weight = newProfile.weight || user.weight;
    user.height = newProfile.height || user.height;
    user.bio = newProfile.bio || user.bio;
    user.profilePicture = newProfile.profilePicture || user.profilePicture;
    await user.save();
    res.json({
        message: "Profile updated successfully",
        user,
      });
}



module.exports = {
    getUserId,
    getProfile,
    updateProfile,

};