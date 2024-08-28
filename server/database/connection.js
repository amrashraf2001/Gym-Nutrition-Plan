const mongoose = require("mongoose");

const url = "mongodb+srv://amrateia46:Complex2024@gym-nutrition-plan.rsmkz.mongodb.net/?retryWrites=true&w=majority&appName=Gym-Nutrition-Plan";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
}

module.exports = { connectDB };