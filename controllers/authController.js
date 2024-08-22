const User = require("../models/user");
const authService = require("../services/authServices");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config();

const forgetUsername = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "abc@gmail.com",
      pass: "123456",
    },
  });

  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }
  transporter.sendMail(
    {
      from: "abc@gmail.com",
      to: email,
      subject: "",
      text: `Hi there`,
    },
    (err, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to send email: ", error: err.message });
      }
      res.send("Email sent");
    }
  );
};

const forgetPassword = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "abc@gmail.com",
        pass: "123456",
      },
    });
    let email = req.body.email;
    const username = req.body.username;
    let user;
    if (!username) {
      user = await User.findOne({ email: email });
    } else if (!email) {
      user = await User.findOne({ userName: username });
      email = user.email;
    } else {
      user = await User.findOne({ email: email, userName: username });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const payload = {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        type: "normal",
      },
    };
    let token = "";
    try {
      token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 500000000000,
      });
    } catch (err) {
      console.log(err.message);
    }
    transporter.sendMail(
      {
        from: "abc@gmail.com",
        to: email,
        subject: "meh",
        text: `Hi there,`,
      },
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to send email", error: err.message });
        }
        res.status(200).json({ message: "Email sent" });
      }
    );
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Failed to send email", error: err.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userName, password, email } = req.body;
  try {
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }
    await user.save();
    const payload = {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        type: "normal",
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 500000000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "User logged in successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logout = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .clearCookie("token")
        .json({ message: "User logged out successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password, gender } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    user = new User({
      userName,
      email,
      password,
      gender,
      signupGoogle: false,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const newUser = await user.save();

    const payload = {
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        type: "normal",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 500000000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "User registered successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const generateUserName = async (req, res, next) => {
  try {
    const userNames = await authService.generateRandomUsername();
    res.status(200).json({
      message: "Usernames created Successfully",
      usernames: userNames,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Creating usernames", error: err.message });
  }
};
const updatePassword = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  let email = "";
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    email = decoded.user.email;
  });
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }
  if (password.length == 0 || passwordConfirm.length == 0) {
    return res.status(400).json({ message: "Password cannot be empty" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  res.json({ message: "Password updated successfully" });
};

const updateEmail = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const userId = req.userId;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email & Password cannot be empty" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  user.email = email;
  await user.save();
  res.json({ message: "Email updated successfully" });
};

const changePassword = async (req, res, next) => {
  const userId = req.userId;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (newPassword === oldPassword) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as old password" });
    }
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error Changing user Password" });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  forgetUsername,
  forgetPassword,
  generateUserName,
  updatePassword,
  updateEmail,
  changePassword,
};
