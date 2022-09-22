const express = require("express");
const router = express.Router();
const Appointments = require("../model/appointment");
const paginatedResults = require("../middleware/paginatedResults");

// import for AsyncAwait Functions
const CreateAppointmentsPromise = require("../AsyncAwait/Appointments/AddAppointment");
const GetAllAppointmentsPromise = require("../AsyncAwait/Appointments/AllAppointments");

//get all appointments
// router.get("/list_appointments", paginatedResults(Appointments), (req, res) => {
//   res.json(res.paginatedResults);
// });

router.get("/appointments", async (req, res) => {
  try {
    const resultElements = await GetAllAppointmentsPromise();
    res.status(200).json({ Patients: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Remove appointment from the list
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Appointments.findByIdAndRemove(id).exec();
  res.send("Appointment has been deleted");
  console.log("Appointment has been deleted");
});

// create new Appointment
router.post("/appointment/create", async (req, res) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const { PatientID, Schedule, ServiceID, Status } = req.body;
  try {
    await CreateAppointmentsPromise({
      PatientID,
      Schedule,
      ServiceID,
      Status,
      CreatedDate: date,
    });
    res.status(200).json({ message: "Appointment added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// update appointment's data
router.patch("/update/:id", async (req, res) => {
  try {
    await Appointments.findById(req.body.id)
      .then((appointsData) => {
        appointsData.firstname = req.body.firstname;
        appointsData.lastname = req.body.lastname;
        appointsData.save();
        res.send("successfully updated");
        console.log("successfully updated");
        res.status(200).json({ message: "data has been updated successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: "field is required" });
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
