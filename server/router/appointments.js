const express = require("express");
const router = express.Router();
const Appointments = require("../model/appointment");
const paginatedResults = require("../middleware/paginatedResults");

// import for AsyncAwait Functions
const CreateAppointmentsPromise = require("../AsyncAwait/Appointments/AddAppointment");
const GetAllAppointmentsPromise = require("../AsyncAwait/Appointments/AllAppointments");
const DashboardAppointmentsPromise = require("../AsyncAwait/Appointments/dashboardAppointments");
const SelectAppointmentsByDateRange = require("../AsyncAwait/Appointments/AppointmentsByDateRange");
const GetAllAppointmentswithPatientsPromise = require("../AsyncAwait/Appointments/AppointmentswithPatients");
const UpdateAppointmentPromiseByID = require("../AsyncAwait/Appointments/UpdateAppointment");

//get all appointments
// router.get("/list_appointments", paginatedResults(Appointments), (req, res) => {
//   res.json(res.paginatedResults);
// });

// Get All Appointments
router.get("/appointments", async (req, res) => {
  try {
    const resultElements = await GetAllAppointmentsPromise();
    res.status(200).json({ Appointments: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get All Appointments with Patients Table
router.get("/appointmentswithpatients", async (req, res) => {
  try {
    const resultElements = await GetAllAppointmentswithPatientsPromise();
    res.status(200).json({ Appointments: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get All Appointments By Date Range
router.get("/appointments_daterange", async (req, res) => {
  const { StartDate, EndDate } = req.query;

  try {
    const resultElements = await SelectAppointmentsByDateRange({
      StartDate,
      EndDate,
    });
    res.status(200).json({ Appointments: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get All Appointments for Today in the Dashboard Page
router.get("/appointments/today", async (req, res) => {
  try {
    const resultElements = await DashboardAppointmentsPromise();
    res.status(200).json({ Appointments: resultElements });
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
  const { PatientID, Schedule, ServiceID, Notes } = req.body;
  const date = new Date(Schedule);
  date.setDate(date.getDate() + 30);
  const appointmentSchedule = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  try {
    await CreateAppointmentsPromise({
      PatientID,
      Schedule: appointmentSchedule,
      ServiceID,
      Status: "Pending",
      Notes,
      isAllDay: true,
    });
    res.status(200).json({ message: "Appointment added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// update appointment's data
router.patch("/appointment/update/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    await UpdateAppointmentPromiseByID({
      AppointmentID: req.params.id,
      Status: req.body.Status,
    });
    res.status(200).json({ message: "Appointment Updated successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
