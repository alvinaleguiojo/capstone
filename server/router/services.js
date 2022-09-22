const express = require("express");
const router = express.Router();

// import for AsyncAwait Functions
const AddService = require("../AsyncAwait/Services/AddServices");
const GetAllServicesPromise = require("../AsyncAwait/Services/AllServices");

router.use(express.json());

// Get All Services
router.get("/services", async (req, res) => {
  try {
    const resultElements = await GetAllServicesPromise();
    res.status(200).json({ Services: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add New Service
router.post("/service/create", async (req, res) => {
  const ServiceType = req.body.ServiceType;
  const Availability = req.body.Availability;

  try {
    await AddService({
      ServiceType,
      Availability,
    });
    res.status(200).json({ message: "Service Added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

module.exports = router;
