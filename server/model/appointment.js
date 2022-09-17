const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: false,
  },
  note: {
    type: String,
  },
  schedule: {
    type: Date,
    required: true,
  },
  service_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
