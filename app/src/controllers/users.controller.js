const userModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ErrorHandler");
const validators = require("../utils/validators");

const userHandlers = {
  getUsers: asyncHandler(async (req, res) => {
    const getData = await userModel.find({});
    if (!getData.length) {
      return res.status(404).json({ message: "data not found" });
    }
    return res.status(200).json({
      success: true,
      data: getData,
    });
  }),
  getUsersById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findUserById = await userModel.findById(id);
    if (!findUserById) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({
      success: true,
      data: findUserById,
    });
  }),
  postUsers: asyncHandler(async (req, res) => {
    const { name, email, age } = req.body;

    const bodyData = { name, email, age };

    const { isValid, missingFields } = validators(bodyData);

    if (!isValid) {
      return res
        .status(400)
        .json(`missing Field is ${missingFields.join(",")}`);
    }

    const userData = new userModel({
      name,
      email,
      age,
    });

    const userInsertData = await userData.save();

    return res.status(200).json({
      id: userInsertData._id,
    });
  }),
  putUsers: asyncHandler(async (req, res) => {
    console.log("function coo");
    const { id } = req.params;
    const { name, email, age } = req.body;
    const { isValid, missingFields } = validators({ name, email, age });
    if (!isValid) {
      throw ApiError(400, `missing Field is ${missingFields.join(",")}`);
    }
    const updatedUserObj = {
      name,
      email,
      age,
    };
    const updatedUserData = await userModel.findByIdAndUpdate(
      id,
      updatedUserObj
    );
    return res.status(200).json({
      success: true,
      id: updatedUserData._id,
    });
  }),
  deleteUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findUser = await userModel.findByIdAndDelete(id);
    if (!findUser) {
      return res.status(400).json({ message: "something went wrong" });
    }
    return res.status(200).json({ message: "user deleted successfully" });
  }),
  getUserTopAge: asyncHandler(async (req, res) => {
    const { age } = req.query;
    console.info("🚀 ~ age:", age);
    if (!age) {
      return res.status(400).json({ message: "age is require" });
    }
    const findTopUser = await userModel
      .find()
      .sort({ age: -1 })
      .limit(Number(age));
    if (!findTopUser) {
      return res.status(404).json({ message: "top user not found" });
    }
    return res.status(200).json({
      success: true,
      data: findTopUser,
    });
  }),
};

module.exports = userHandlers;
