// import db connection
const connection = require("../../db/connection");

// Get All Certificates
const RetrieveCertificateByIDPromise = ({ DiagnosisID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Certificates WHERE DiagnosisID=${DiagnosisID}`,
      (error, Certificates) => {
        error && reject(error);
        return resolve(Certificates);
      }
    );
  });
};

module.exports = RetrieveCertificateByIDPromise;
