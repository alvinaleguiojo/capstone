const express = require("express");
const router = express.Router();

const CreateDiagnosisPromise = require("../AsyncAwait/Diagnosis/CreateDiagnosis");
const GetAllDiagnosisPromise = require("../AsyncAwait/Diagnosis/DiagnosisList");
const GetDiagnosisByIDPromise = require("../AsyncAwait/Diagnosis/PatientDiagnosis");

// Get ALl Diagnosis
router.get("/diagnosis", async (req, res) => {
  try {
    const resultElements = await GetAllDiagnosisPromise();
    res.status(200).json({ Diagnosis: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get Patient Diagnosis
router.get("/patient/diagnosis/:id", async (req, res) => {
  try {
    const resultElements = await GetDiagnosisByIDPromise({
      PatientID: req.params.id,
    });
    res.status(200).json({ Diagnosis: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add New Diagnosis
router.post("/diagnosis/create", async (req, res) => {
  const { PatientID, StaffID, Diagnose, Notes } = req.body;

  try {
    await CreateDiagnosisPromise({
      PatientID,
      StaffID,
      Diagnose,
      Notes,
    });
    res.status(200).json({ message: "Diagnosis Added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

module.exports = router;
