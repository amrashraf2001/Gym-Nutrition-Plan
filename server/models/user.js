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
});

module.exports = mongoose.model("user", userSchema);