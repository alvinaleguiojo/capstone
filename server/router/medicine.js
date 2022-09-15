const express = require("express");
const router = express.Router();
const Users = require("../model/user");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../middleware/JWT");

router.use(cookieParser());
require("dotenv").config();

// get all users
router.get("/users", paginatedResults(Users), (req, res) => {
    res.json(res.paginatedResults);
  });