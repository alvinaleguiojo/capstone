const express = require("express");
const router = express.Router();

const twilio = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

// twilio route for sending sms
router.post("/sendMessagetoPatient", (req, res) => {
  twilio.messages
    .create({
      from: process.env.TWILIO_NUMBER,
      to: req.body.phone,
      body: req.body.text,
    })
    .then((response) => console.log("message sent"))
    .catch((err) => {
      console.log("error: " + err.message);
    });
});

module.exports = router;
