const User = require("../models/user");
const Food = require("../models/food");
const Plan = require("../models/plan");


const getUserId = async (req, res, next) => {
    const userName = req.query.userName
    const user = await User.findOne({ userName: userName });
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




module.exports = {
    getUserId,
    getProfile,

};