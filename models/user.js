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
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("user", userSchema);
