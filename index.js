const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multerConfig = require("./middleware/multerConfig");
const cors = require("cors");
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(
    "mongodb+srv://amrateia46:Complex2024@gym-nutrition-plan.rsmkz.mongodb.net/?retryWrites=true&w=majority&appName=Gym-Nutrition-Plan"
  )
  .then((result) => {
    console.log("Connected to the database");
    app.listen(PORT, (req, res, next) => {
      console.log(`Server running on port ${PORT}`);
      //const userRoutes = require("./routes/userRoutes");
      const authRoutes = require("./routes/authRoutes");

      //app.use("/user", userRoutes);
      app.use("/auth", authRoutes);

      app.get("/", function (req, res) {
        res.send("Hello World!");
      });
    });
  })
  .catch((err) => console.log(err));