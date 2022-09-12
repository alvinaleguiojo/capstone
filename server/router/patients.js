const express = require("express");
const router = express.Router();
const Appointments = require("../model/appointment");
const getById = require("../middleware/getById")
const { validateToken } = require("../middleware/JWT");

router.get("/patients/:id", getById(Appointments), (req, res) => {
  res.json(res);
});

router.get("/profile", validateToken, (req, res) =>{
   res.json({message: "you're in profile page"})
})

module.exports = router;
