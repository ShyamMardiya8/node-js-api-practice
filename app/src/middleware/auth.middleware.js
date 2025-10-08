const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ApiError = require("../utils/ErrorHandler");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).json({ message: "web token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req._id = decoded._id;
    next();
  } catch (err) {
    console.log(
      err.message,
      new Date().toLocaleString(),
      "auth middleware error"
    );
    throw new ApiError(500, err.message);
  }
};

module.exports = authMiddleware;
