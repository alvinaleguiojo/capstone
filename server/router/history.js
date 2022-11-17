const express = require("express");
const router = express.Router();

const GetPatientHistoryByIDPromise = require("../AsyncAwait/History/PatientHistory");

// Get Patient's History By ID
router.get("/patient/history/:id", async (req, res) => {
  try {
    const resultElements = await GetPatientHistoryByIDPromise({
      PatientID: req.params.id,
    });
    res.status(200).json({ History: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
