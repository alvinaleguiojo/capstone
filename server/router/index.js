const express = require("express");
const router = express.Router();
const { createTokens, validateToken } = require("../middleware/JWT");

router.get("/", validateToken, (req, res) => {
  res.status(200).json({ message: "You are authenticated" });
});

module.exports = router;
