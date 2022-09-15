const express = require("express");
const router = express.Router();
const Medicine = require("../model/medicine");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../middleware/JWT");

router.use(cookieParser());
require("dotenv").config();

// get all medicines
router.get("/medicines", paginatedResults(Medicine), (req, res) => {
  res.json(res.paginatedResults);
});

// create new medicines
router.post("/medicine/add", async (req, res) => {
  const { patient_id, medicine_name, quantity, expiry_date, stocks, status } =
    req.body;
  try {
    const Medicines = await Medicine.create({
      patient_id,
      medicine_name,
      quantity,
      expiry_date,
      entry_date: new Date(),
      stocks,
      status,
    });

    res.status(200).json({ message: "Medicines added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// update medicines data
router.patch("/medicine/update/:id", async (req, res) => {
  try {
    const medicineData = await Medicine.findById(req.params.id);

    medicineData.quantity = await req.body.quantity;
    medicineData.stocks = await req.body.stocks;
    medicineData.status = await req.body.status;
    medicineData.save();
    if ( medicineData) {
    console.log("successfully updated");
    res.status(200).json({ message: "data has been updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
