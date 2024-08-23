const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    totalCalories: {
        type: Number,
        required: true,
    },
    totalWeight: {
        type: Number,
        required: true,
    },
    listOfTotalNutrients: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("plan", planSchema);
