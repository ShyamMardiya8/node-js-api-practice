const mongoose = require("mongoose");
require("dotenv").config();
const mongodbUri = process.env.uri;
const connectMongodb = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected successfully");
  } catch (err) {
    console.error(err.message, "mongodb connection");
  }
};

module.exports = connectMongodb;
