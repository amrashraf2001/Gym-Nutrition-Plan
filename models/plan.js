const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    totalCalories: {
        type: Number,
        required: true,
    },
    totalWeight: {
        type: Number,
        required: true,
    },
    totalProtein: {
        type: Number,
        required: true,
    },
    totalCarbs: {
        type: Number,
        required: true,
    },
    totalFats: {
        type: Number,
        required: true,
    },
    listOfFoods: [
        {
            type: Schema.Types.ObjectId,
            ref: "food",
        },
    ],
    listOfWeights: [
        {
            type: Number,
            required: true,
        },
    ],
});

module.exports = mongoose.model("plan", planSchema);
