const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  vaccine: {
    type: Boolean,
    required: false,
  },
  immunization: {
    type: Boolean,
    required: false,
  },
  prenatal: {
    type: Boolean,
    required: false,
  },
  schedule: {
    type: Date,
    required: true,
  },
  service_type:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
