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

// get all users
router.get("/medicines", paginatedResults(Medicines), (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = router;



