const mongoose = require("mongoose");

const url = "mongodb+srv://amrateia4:Complex2024@gym-nutrition-plan.rsmkz.mongodb.net/?retryWrites=true&w=majority&appName=Gym-Nutrition-Plan";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        throw "failed to connect to database" // Exit process with failure
    }
}

module.exports = { connectDB };