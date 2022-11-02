const express = require("express");
const router = express.Router();

const NewNotificationPromise = require("../AsyncAwait/Notifications/NewNotifications");
const GetNotificationByIDPromise = require("../AsyncAwait/Notifications/StaffNotification");

// Get Notifications By StaffID
router.get("/staff/notifications/:id", async (req, res) => {
  try {
    const resultElements = await GetNotificationByIDPromise({
      StaffID: req.params.id,
    });
    res.status(200).json({ Notifications: resultElements });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add New Diagnosis
router.post("/diagnosis/create", async (req, res) => {
  const { StaffID, Type, Route, Unread , Description} = req.body;
  const today = new Date();
  today.setDate(today.getDate() + 31);
  const CurrentDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  try {
    await NewNotificationPromise({
      StaffID,
      Type,
      Route,
      CurrentDate,
      Unread,
      Description
    });
    res.status(200).json({ message: "Notification Added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

module.exports = router;
