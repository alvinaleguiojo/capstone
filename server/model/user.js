const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  license: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
