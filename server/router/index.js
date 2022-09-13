const express = require("express");
const router = express.Router();
const { createTokens, validateToken } = require("../middleware/JWT");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.get("/", validateToken, (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "You are authenticated", userData: data });
  } catch {
    return res.sendStatus(403);
  }
});

module.exports = router;
