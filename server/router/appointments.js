const express = require("express");
const router = express.Router();
const Appointments = require("../model/appointment");
const paginatedResults = require("../middleware/paginatedResults");

//get all appointments
router.get("/list_appointments", paginatedResults(Appointments), (req, res) => {
  res.json(res.paginatedResults);
});

// Remove appointment from the list
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Appointments.findByIdAndRemove(id).exec();
  res.send("Appointment has been deleted");
  console.log("Appointment has been deleted");
});

// create new Appointment
router.post("/appointment", async (req, res) => {
  try {
    await Appointments.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      phone: req.body.phone,
      note: req.body.note,
      vaccine: req.body.vaccine,
      immunization: req.body.immunization,
      prenatal: req.body.prenatal,
      schedule: req.body.schedule,
      service_type: req.body.service_type,
    });
    console.log("appointment added successfully");
    res.status(200).json({ message: "appointment added successfully" });
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
