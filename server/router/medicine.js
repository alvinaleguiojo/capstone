const express = require("express");
const router = express.Router();
const Medicines = require("../model/medicine");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../middleware/JWT");

router.use(cookieParser());
require("dotenv").config();


// import for AsyncAwait Functions
const GetAllMedicinesPromise = require("../AsyncAwait/Medicines/AllMedicines");

// get all medicines
// router.get("/medicines", paginatedResults(Medicines), (req, res) => {
//   res.json(res.paginatedResults);
// });


// Get All Appointments
router.get("/medicines", async (req, res) => {
  try {
    const resultElements = await GetAllMedicinesPromise();
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;



