const express = require("express");
const router = express.Router();
const Patients = require("../model/patient");
const getById = require("../middleware/getById");
const { validateToken } = require("../middleware/JWT");
const paginatedResults = require("../middleware/paginatedResults");

// import for AsyncAwait Functions
const RegisterPatientPromise = require("../AsyncAwait/Patients/RegisterPatient");
const GetAllPatientsPromise = require("../AsyncAwait/Patients/Patients");
const GetPatientsByIDPromise = require("../AsyncAwait/Patients/PatientsByID");
const DeletePatientsByIDPromise = require("../AsyncAwait/Patients/DeletePatient");
const UpdatePatientsPromiseByID = require("../AsyncAwait/Patients/UpdatePatient");
const AddPatientHistoryPromise = require("../AsyncAwait/PatientHistory/AddHistory");

router.use(express.json());

// router.get("/patients", paginatedResults(Patients), (req, res) => {
//   res.json(res.paginatedResults);
// });
// Get ALl Patients
router.get("/patients", async (req, res) => {
  try {
    const resultElements = await GetAllPatientsPromise();
    res.status(200).json({ Patients: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// router.get("/patients/:id", getById(Patients), (req, res) => {
//   res.json(res);
// });
// GET Patient By ID
router.get("/patient/:id", async (req, res) => {
  const PatientID = req.params.id;
  try {
    const patient = await GetPatientsByIDPromise(PatientID);
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: "Invalid PatientID" });
  }
});

// Remove Patient from the list
router.delete("/patient/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const patient = await GetAllPatientsPromise();
    const id = await patient.filter((id) => id.PatientID == ID);
    await DeletePatientsByIDPromise({ PatientID: id[0].PatientID });
    res.json({ message: "Patient has been deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid PatientID" });
  }
});

router.get("/profile", validateToken, (req, res) => {
  res.json({ message: "you're in profile page" });
});

// Add new Patient
router.post("/patient/register", async (req, res) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const {
    LastName,
    FirstName,
    MiddleName,
    Suffix,
    Phone,
    BirthDate,
    Gender,
    Street,
    Baranggay,
    City,
    MedicineIntake,
    Allergies,
    Measles,
    Immunization,
    Tuberculosis,
    ImageID,
  } = req.body;

  try {
    const newPatient = await RegisterPatientPromise({
      LastName,
      FirstName,
      MiddleName,
      Suffix,
      Phone,
      BirthDate,
      Gender,
      Street,
      Baranggay,
      City,
      ImageID,
      CreatedDate: date,
    });
    const PatientID = await newPatient.insertId;
    await AddPatientHistoryPromise({
      PatientID,
      MedicineIntake,
      Allergies,
      Measles,
      Immunization,
      Tuberculosis,
    });
    res.status(200).json({ message: "Patient added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// Update patient
router.patch("/patient/update/:id", async (req, res) => {
  const ID = req.params.id;
  const { Address, Phone } = req.body;
  try {
    const patients = await GetAllPatientsPromise();
    const result = await patients.filter((patient) => patient.PatientID == ID);
    await UpdatePatientsPromiseByID({
      PatientID: result[0].PatientID,
      Address,
      Phone,
    });
    res.status(200).json({ message: "data has been updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid Data Entry" });
  }
});

module.exports = router;
