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
  const firstname = req.body[0];
  const lastname = req.body[1];
  const age = req.body[2];
  const address = req.body[3];
  const phone = req.body[4];
  const gender = req.body[5];

  try {
    const result = await Patients.create({
      firstname,
      lastname,
      age,
      address,
      phone,
      gender,
      created_date: new Date(),
    });
    result && res.status(200).json({ message: "Patient added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

module.exports = router;
