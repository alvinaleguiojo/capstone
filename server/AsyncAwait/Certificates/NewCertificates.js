// import db connection
const connection = require("../../db/connection");

// Create new Notifications
const NewCertificatesPromise = ({ DiagnosisID, PDFLinkID }) => {
  const newDiagnosis = `INSERT INTO Certificates (DiagnosisID, PDFLinkID) VALUES (${DiagnosisID}, '${PDFLinkID}')`;
  return new Promise((resolve, reject) => {
    connection.query(newDiagnosis, (error, Diagnosis) => {
      error && reject(error);
      return resolve(Diagnosis);
    });
  });
};

module.exports = NewCertificatesPromise;
