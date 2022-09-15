const express = require("express");
const router = express.Router();
const Users = require("../model/user");

//search patients API
router.get("/search", (req, res) => {
  const firstname = req.query.firstname;

  Users.find({
    firstname: { $regex: firstname, $options: "$i" },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
