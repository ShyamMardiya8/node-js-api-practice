const mongoose = require("mongoose");
// const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  age: {
    type: Number,
    require: true,
    trim: true,
  },
});

const userModel = mongoose.model("userSchema", userSchema);
module.exports = userModel;
