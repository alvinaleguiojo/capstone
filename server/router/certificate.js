const express = require("express");
const router = express.Router();

const NewCertificatesPromise = require("../AsyncAwait/Certificates/NewCertificates");
const RetrieveCertificateByIDPromise = require("../AsyncAwait/Certificates/RetrieveCertificateByID");

// Get Patient's List of Certificates
router.get("/patient/certificate/:id", async (req, res) => {
  try {
    const resultElements = await RetrieveCertificateByIDPromise({
      DiagnosisID: req.params.id,
    });
    res.status(200).json({ Certificates: resultElements });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

// Add New Diagnosis
router.post("/certificates/create", async (req, res) => {
  const { DiagnosisID, PDFLinkID } = req.body;

  try {
    await NewCertificatesPromise({
      DiagnosisID,
      PDFLinkID,
    });
    res
      .status(200)
      .json({ message: "Certificates has been added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Invalid data entry" });
  }
});

module.exports = router;
