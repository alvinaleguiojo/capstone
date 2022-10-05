const express = require("express");
const router = express.Router();

// import for AsyncAwait Functions
const AddService = require("../AsyncAwait/Services/AddServices");
const GetAllServicesPromise = require("../AsyncAwait/Services/AllServices");
const GetAllServicesEnabledPromise = require("../AsyncAwait/Services/ServiceEnabled");
const UpdateServicesPromiseByID = require("../AsyncAwait/Services/UpdateService");
const DeleteServicesByIDPromise = require("../AsyncAwait/Services/DeleteService");

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

// Get All Services when Availability is true
router.get("/services_enabled", async (req, res) => {
  try {
    const resultElements = await GetAllServicesEnabledPromise();
    res.status(200).json({ Services: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add New Service
router.post("/service/create", async (req, res) => {
  const ServiceType = req.body.ServiceType;
  const Availability = req.body.Availability == "true" ? true : false;
  const Description = req.body.Description;

  try {
    await AddService({
      ServiceType,
      Availability,
      Description,
    });
    res.status(200).json({ message: "Service Added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

router.patch("/service/update/:id", async (req, res) => {
  const ServiceID = req.params.id;
  const { Availability, ServiceType } = req.body;

  try {
    await UpdateServicesPromiseByID({
      ServiceID,
      Availability,
      ServiceType,
    });
    res.status(200).json({ message: "Service has been updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// Remove Service from the list
router.delete("/service/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const service = await GetAllServicesPromise();
    const id = await service.filter((id) => id.ServiceID == ID);
    await DeleteServicesByIDPromise({ ServiceID: id[0].ServiceID });
    res.json({ message: "Patient has been deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid PatientID" });
  }
});

module.exports = router;
