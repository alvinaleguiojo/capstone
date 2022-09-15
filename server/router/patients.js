const express = require("express");
const router = express.Router();
const Patients = require("../model/patient");
const getById = require("../middleware/getById");
const { validateToken } = require("../middleware/JWT");
const paginatedResults = require("../middleware/paginatedResults");

router.use(express.json());

router.get("/patients", paginatedResults(Patients), (req, res) => {
  res.json(res.paginatedResults);
});

router.get("/patients/:id", getById(Patients), (req, res) => {
  res.json(res);
});

router.get("/profile", validateToken, (req, res) => {
  res.json({ message: "you're in profile page" });
});

// Add new Patient
router.post("/patient/register", async (req, res) => {
  const firstname = req.body[0] || req.body.firstname;
  const lastname = req.body[1] || req.body.lastname;
  const age = req.body[2] || req.body.age;
  const address = req.body[3] || req.body.address;
  const phone = req.body[4] || req.body.phone;
  const gender = req.body[5] || req.body.gender;
  const diagnosis = req.body.diagnosis;
  const service_type = req.body.service_type;
  const last_visited = req.body.last_visited;

  try {
    const result = await Patients.create({
      firstname,
      lastname,
      age,
      address,
      phone,
      gender,
      created_date: new Date(),
      diagnosis,
      service_type,
      last_visited,

    });
    result && res.status(200).json({ message: "Patient added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});


// Update patient
router.patch("/patient/update/:id", async (req, res) => {
  try {
    const patientData = await Patients.findById(req.params.id);

    patientData.address = await req.body.address;
    patientData.phone = await req.body.phone;
    patientData.email = await req.body.email;
    patientData.diagnosis = await req.body.diagnosis;
    patientData.service_type = await req.body.service_type;
    patientData.last_visited = await req.body.last_visited;
    patientData.save();
    if ( patientData) {
    console.log("successfully updated");
    res.status(200).json({ message: "data has been updated successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid Data Entry" });
  }
});

module.exports = router;
