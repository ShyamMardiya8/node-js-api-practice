const { client } = require("../config/redisConnections");
const userModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ErrorHandler");
const responseHandler = require("../utils/responseHandler");
const validators = require("../utils/validators");

const ApiErrorV2 = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const userHandlers = {
  getUsers: asyncHandler(async (req, res) => {
    // 1️⃣ Check Redis cache first
    const cachedData = await client.get("users");

    if (cachedData) {
      // If cache exists, return it directly
      console.info("🚀 Returning cached data");
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const getData = await userModel.find({});

    if (!getData.length) {
      return ApiErrorV2(res, 400, `user data not found`);
    }

    // 3️⃣ Cache the result in Redis for 60 seconds
    await client.setEx("users", 60, JSON.stringify(getData));

    // 4️⃣ Return the response
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
      throw new ApiError(400, `missing Field is ${missingFields.join(",")}`);
    }

    const userData = new userModel({
      name,
      email,
      age,
    });

    const userInsertData = await userData.save();

    return responseHandler(res, { _id: userInsertData._id });
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
  pagination: asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const { isValid, missingFields } = validators({ page, limit });
    if (!isValid) {
      throw new ApiError(
        400,
        `Require for use pagination api ${missingFields.join(",")}`
      );
    }
    const skipLogic = (page - 1) * limit;
    const findData = await userModel.find().skip(skipLogic).limit(limit).exec();
    if (!findData.length) {
      throw new ApiError(404, "not data found");
    }
    return responseHandler(res, findData);
  }),
  ageHandler: asyncHandler(async (req, res) => {
    const { ages } = req.query;
    if (!ages) {
      throw new ApiError(400, "ages is required to find data");
    }
    const userAgeData = await userModel.find({ age: ages });
    console.info("🚀 ~ userAgeData:", userAgeData);
    if (!userAgeData.length) {
      throw new ApiError(404, "no data found");
    }
    return responseHandler(res, userAgeData);
  }),
  searchByName: asyncHandler(async (req, res) => {
    const { name } = req.query;
    if (!name) {
      throw new ApiError(400, "name is required");
    }
    const userFindByName = await userModel.find({ name: name });
    if (!userFindByName.length) {
      throw new ApiError(400, "data not found");
    }
    return responseHandler(res, userFindByName);
  }),
  sortHandler: asyncHandler(async (req, res) => {
    const { sortBy, order } = req.query;
    console.info("🚀 ~ order:", order);
    console.info("🚀 ~ sortBy:", sortBy);
    const { isValid, missingFields } = validators({ sortBy, order });
    if (!isValid) {
      throw new ApiError(400, `required query ${missingFields.join(",")}`);
    }
    const sortObj = { [sortBy]: Number(order) };
    console.info("🚀 ~ sortObj:", sortObj);

    const getUserDataBySort = await userModel.find().sort(sortObj);
    console.info("🚀 ~ getUserDataBySort:", getUserDataBySort);
    if (!getUserDataBySort.length) {
      throw new ApiError(404, "data not found");
    }
    return responseHandler(res, getUserDataBySort);
  }),
};

module.exports = userHandlers;
