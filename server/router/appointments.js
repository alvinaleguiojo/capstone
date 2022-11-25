const express = require("express");
const router = express.Router();
const Appointments = require("../model/appointment");
const paginatedResults = require("../middleware/paginatedResults");
const moment = require("moment");

// import for AsyncAwait Functions
const CreateAppointmentsPromise = require("../AsyncAwait/Appointments/AddAppointment");
const GetAllAppointmentsPromise = require("../AsyncAwait/Appointments/AllAppointments");
const DashboardAppointmentsPromise = require("../AsyncAwait/Appointments/dashboardAppointments");
const SelectAppointmentsByDateRange = require("../AsyncAwait/Appointments/AppointmentsByDateRange");
const GetAllAppointmentswithPatientsPromise = require("../AsyncAwait/Appointments/AppointmentswithPatients");
const UpdateAppointmentPromiseByID = require("../AsyncAwait/Appointments/UpdateAppointment");
const RemoveAppointmentByIDPromise = require("../AsyncAwait/Appointments/RemoveAppointment");
const AutoUpdateStatusPromiseByID = require("../AsyncAwait/Appointments/AutoUpdateStatus");

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
router.delete("/appointment/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const appointments = await GetAllAppointmentsPromise();
    const id = await appointments.filter((id) => id.AppointmentID == ID);
    await RemoveAppointmentByIDPromise({ AppointmentID: id[0].AppointmentID });
    res.json({ message: "Appointment has been deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid AppointmentID" });
  }
});

// create new Appointment
router.post("/appointment/create", async (req, res) => {
  const { PatientID, Schedule, ServiceID, Notes } = req.body;
  const date = new Date(Schedule);
  date.setDate(date.getDate() + 30);
  const appointmentSchedule = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  try {
    const response = await CreateAppointmentsPromise({
      PatientID,
      Schedule: appointmentSchedule,
      ServiceID,
      Status: "Pending",
      Notes,
      isAllDay: true,
    });
    res.status(200).json({
      appointmentData: response,
      message: "Appointment added successfully",
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// update appointment's data
router.patch("/appointment/update/:id", async (req, res) => {
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

setInterval(() => {
  async function UpdateStatus() {
    const today = moment().format("YYYY-MM-DD");

    try {
      await AutoUpdateStatusPromiseByID({
        today,
        Status: "Cancelled",
      });
      console.log("Appointments Status has been cancelled");
    } catch (err) {
      console.log(err.message);
    }
  }
  UpdateStatus();
}, 1000 * 60 * 12);

module.exports = router;
