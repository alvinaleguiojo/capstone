const express = require("express");
const router = express.Router();
const Appointments = require("../model/appointment");

//search patients API
router.get("/search", (req, res) => {
  const searchField = req.query.firstname;
  Appointments.find({
    firstname: { $regex: searchField, $options: "$i" },
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
