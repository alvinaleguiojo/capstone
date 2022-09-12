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
  Age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Patient", userSchema);
