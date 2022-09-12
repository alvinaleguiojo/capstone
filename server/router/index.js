const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ name: "Welcome", message: "hello world!" });
  });

  module.exports = router;
  