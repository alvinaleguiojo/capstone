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
    required: true,
  },
  immunization: {
    type: Boolean,
    required: true,
  },
  prenatal: {
    type: Boolean,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
