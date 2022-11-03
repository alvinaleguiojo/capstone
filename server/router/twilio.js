const express = require("express");
const router = express.Router();

const twilio = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

// twilio route for sending sms
router.post("/sendMessagetoPatient", async (req, res) => {
  try {
    await twilio.messages.create({
      from: process.env.TWILIO_NUMBER,
      to: req.body.phone,
      body: req.body.text,
    });
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid Phone Number" });
  }
});

module.exports = router;
