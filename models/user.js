const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number,
        default: 0,
    },
    height: {
        type: Number,
        default: 0,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    listOfPlans: [
        {
            type: Schema.Types.ObjectId,
            ref: "plan",
        },
    ],
    disease: {
        type: String,
        default: "",
    },
    phoneNum: {
        type: String,
        default: "",
    },
    listOfTrackedFoods: [
        [
            {
                type: Schema.Types.ObjectId,
                ref: "food",
            },
            {
                type: Number,
                default: 0,
            },
            {
                type: Date,
                default: Date.now,
            }
        ]
    ],
});

module.exports = mongoose.model("user", userSchema);
