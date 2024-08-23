const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    listOfNutrients: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model("food", foodSchema);