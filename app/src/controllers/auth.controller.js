const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const validators = require("../utils/validators");
const ApiError = require("../utils/ErrorHandler");
const dotenv = require("dotenv");
const responseHandler = require("../utils/responseHandler");
const userAuthModel = require("../models/userAuth.model");
const bcrypt = require("bcrypt");
dotenv.config();

const userAuth = {
  createUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { isValid, missingFields } = validators({ email, password });
    if (!isValid) {
      throw new ApiError(400, `missingField is ${missingFields.join(",")}`);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createUser = new userAuthModel({
      email,
      password: hashedPassword,
    });

    const createdUserId = await createUser.save();
    return responseHandler(
      res,
      { _id: createdUserId._id },
      "user created successfully"
    );
  }),

  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { isValid, missingFields } = validators({ email, password });
    if (!isValid) {
      throw new ApiError(400, `missingField is ${missingFields.join(",")}`);
    }
    const user = await userAuthModel.findOne({ email: email });
    console.info("🚀 ~ user:", user);
    if (!user) {
      throw new ApiError(400, "user Not Found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.info("🚀 ~ isPasswordValid:", isPasswordValid);

    if (isPasswordValid) {
      throw new ApiError(400, "password is invalid");
    }
    const token = jwt.sign({ _id: user._id }, process.env.secret_key, {
      expiresIn: "1h",
    });
    const refToken = jwt.sign({ _id: user._id }, process.env.secret_key, {
      expiresIn: "30d",
    });

    return responseHandler(res, { token, refToken }, "login success");
  }),
};

module.exports = userAuth;
