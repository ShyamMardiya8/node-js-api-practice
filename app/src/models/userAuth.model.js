const mongoose = require("mongoose");

const userAuth = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const userAuthModel = mongoose.model("userAuthCollection", userAuth);

module.exports = userAuthModel;
