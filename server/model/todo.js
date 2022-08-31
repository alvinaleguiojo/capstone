const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
