const mongoose = require("mongoose");

const url = "mongodb+srv://amrateia46:Complex2024@gym-nutrition-plan.rsmkz.mongodb.net/?retryWrites=true&w=majority&appName=Gym-Nutrition-Plan";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url)
    console.log(`MongoDB connected: ${conn.connection.host}`);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDB();