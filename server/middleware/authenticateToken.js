const jwt = require("jsonwebtoken");
require('dotenv').config();
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    req.userId = null;
    next();
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      req.userId = decoded.user.id;
      console.log("Ana fl Authentication");
      next();
    });
  }
};

module.exports = authenticateToken;