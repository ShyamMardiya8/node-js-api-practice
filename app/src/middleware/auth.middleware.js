const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers("Authorization");
  if (!token) {
    return res.status(400).json({ message: "web token is missing" });
  }
  try {
    const decoded = jwt.verify(token);
    req._id = decoded._id;
    next();
  } catch (er) {
    console.log(err.message, "auth middleware error");
  }
};

module.exports = authMiddleware;
