const User = require("../models/user");
const Food = require("../models/food");
const Plan = require("../models/plan");

const getProfile = async (req, res, next) => {
    const userId = req.params.userId;
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
    getProfile,

};