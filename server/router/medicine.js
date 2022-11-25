const express = require("express");
const router = express.Router();
const Medicines = require("../model/medicine");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../middleware/JWT");
const moment = require("moment");

router.use(cookieParser());
require("dotenv").config();

// import for AsyncAwait Functions
const GetAllMedicinesPromise = require("../AsyncAwait/Medicines/AllMedicines");
const RegisterMedicinePromise = require("../AsyncAwait/Medicines/RegisterMedicine");
const GetMedicinesLimitPromise = require("../AsyncAwait/Medicines/MedicinesLimit");
const CountDocumentsPromise = require("../AsyncAwait/Medicines/CountDocument");
const GetAllMedicinesWithImagePromise = require("../AsyncAwait/Medicines/MedicinesWithImage");
const ReleasedMedicinePromise = require("../AsyncAwait/Medicines/ReleasedMedicine");
const MedicinesByIDPromise = require("../AsyncAwait/Medicines/MedicinesByID");
const RetrieveMedicinesByIDPromise = require("../AsyncAwait/Medicines/RetrieveMedicine");
const RetrieveReleasedMedicinesByIDPromise = require("../AsyncAwait/Medicines/RetrieveReleasedMedicines");
const ReleasedMedicinesCountDocumentsPromise = require("../AsyncAwait/Medicines/ReleasedMedicinesCountDocument");
const RetrieveReleasedMedicinesNoPagition = require("../AsyncAwait/Medicines/RetrieveReleasedMedicinesNoPagination");
const MedicinesByDateIDPromise = require("../AsyncAwait/Medicines/ReleasedByDate");
const UpdateStocksPromise = require("../AsyncAwait/Medicines/UpdateMedicineStocks");
const UpdateStocksExpiryDatePromise = require("../AsyncAwait/Medicines/UpdateStockAndExpiryDate");

// get all medicines
// router.get("/medicines", paginatedResults(Medicines), (req, res) => {
//   res.json(res.paginatedResults);
// });

// Get all medicines with paginatedData
const paginatedData = () => {
  return async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const LIKE = req.query.LIKE;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const rowNumberOfCollection = await CountDocumentsPromise();
    const count = await rowNumberOfCollection[0].NumberOfPatients;
    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const offset = startIndex;

    try {
      results.results = await GetMedicinesLimitPromise({
        limit,
        offset,
        LIKE,
      });
      res.paginatedData = results;
      next();
    } catch (err) {
      console.log("error page and limit or no data");
    }
  };
};

const releasedMedicinespaginatedData = () => {
  return async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const LIKE = req.query.LIKE;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const rowNumberOfCollection =
      await ReleasedMedicinesCountDocumentsPromise();
    const count = await rowNumberOfCollection[0].NumberOfPatients;
    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const offset = startIndex;

    try {
      results.results = await RetrieveReleasedMedicinesByIDPromise({
        limit,
        offset,
        LIKE,
      });
      res.paginatedData = results;
      next();
    } catch (err) {
      console.log("error page and limit or no data");
    }
  };
};

// Add new Patient
router.post("/medicine/register", async (req, res) => {
  const {
    Name,
    Stocks,
    Unit,
    Size,
    ExpiryDate,
    Manufacturer,
    Dosage,
    Description,
    ImageID,
  } = req.body;

  // to check if the image is null then set the default image avatar to this patient
  const Image = ImageID === null ? 187 : ImageID;

  try {
    await RegisterMedicinePromise({
      Name,
      Stocks,
      Unit,
      Size,
      ExpiryDate,
      Manufacturer,
      Dosage,
      Description,
      Availability: true,
      ImageID: Image,
    });
    res.status(200).json({ message: "Medicine added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// Add new Release Medicine
router.post("/medicine/release", async (req, res) => {
  const data = req.body.medicinesList;
  const Note = req.body.note;
  const PatientID = req.body.PatientID;

  data.map(async (medicine) => {
    let Quantity = medicine.Quantity;
    let MedicineID = medicine.MedicineID;
    try {
      await ReleasedMedicinePromise({
        Quantity,
        PatientID,
        MedicineID,
        Note,
      });

      const RetrievedMedicine = await RetrieveMedicinesByIDPromise({
        MedicineID,
      });
      const NewStocks = RetrievedMedicine[0].Stocks - Quantity;
      await UpdateStocksPromise({ MedicineID, NewStocks });

      res.status(200).json({ message: "Medicine has been released" });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: "Invalid data entry" });
    }
  });
});

// Update the Stocks
router.patch("/midicine/stocks/update/:id", async (req, res) => {
  const { Stocks, ExpiryDate } = req.body;
  const MedicineID = req.params.id;
  const NewStocks = Stocks;

  try {
    await UpdateStocksExpiryDatePromise({
      MedicineID,
      NewStocks,
      ExpiryDate,
    });
    res.status(200).json({ message: "Medicine has been updated" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Please change the expiry date and stocks" });
  }
});

// Get All Medicine with Paginated results
router.get("/medicines", paginatedData(), async (req, res) => {
  res.json(res.paginatedData);
});

// Get All Medicine without Paginated results
router.get("/allmedicines", async (req, res) => {
  try {
    const resultElements = await GetAllMedicinesPromise();
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get Released Medicines without Paginated results
router.get("/medicines/released/nopagination", async (req, res) => {
  try {
    const resultElements = await RetrieveReleasedMedicinesNoPagition();
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get All Released Medicines without Paginated results
router.get(
  "/medicines/released",
  releasedMedicinespaginatedData(),
  async (req, res) => {
    res.json(res.paginatedData);
  }
);

// Get Patient's Medicines by ID
router.get("/medicines/:id", async (req, res) => {
  try {
    const resultElements = await MedicinesByIDPromise({
      PatientID: req.params.id,
    });
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get Patient's Released Medicines by Released Date
router.get("/medicines/date/:id", async (req, res) => {
  const { StartDate, EndDate } = req.query;

  // start date add 31 days
  const startdate = new Date(StartDate);
  startdate.setDate(startdate.getDate() + 31);
  const start = moment(startdate).format("YYYY-MM-DD");
  console.log(start);

  // end date add 31 days
  const enddate = new Date(EndDate);
  enddate.setDate(enddate.getDate() + 31);
  const end = moment(enddate).format("YYYY-MM-DD");
  console.log(end);

  try {
    const resultElements = await MedicinesByDateIDPromise({
      PatientID: req.params.id,
      StartDate: start,
      EndDate: end,
    });
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get Medicine Details with Image
router.get("/medicine/detail/:id", async (req, res) => {
  try {
    const resultElements = await RetrieveMedicinesByIDPromise({
      MedicineID: req.params.id,
    });
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get ALl Medicines with Image
router.get("/medicineswithimage", async (req, res) => {
  try {
    const resultElements = await GetAllMedicinesWithImagePromise();
    res.status(200).json({ Medicines: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
