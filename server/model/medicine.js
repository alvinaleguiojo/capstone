const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  medicine_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },

  entry_date: {
    type: Date,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },
  status:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Medicine", medicineSchema);
