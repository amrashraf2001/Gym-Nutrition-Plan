const express = require("express");
const mongoose = require("mongoose");
const {connectDB} = require("./database/connection");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multerConfig = require("./middleware/multerConfig");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) =>{
  res.send("Hello World!");
});

connectDB;

app.listen(PORT, (req, res, next) => {
  console.log(`Server running on http://localhost:${PORT}/`);
});