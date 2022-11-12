// import db connection
const connection = require("../../db/connection");

// Get Diagnosis By ID
const GetDiagnosisDataByIDPromise = ({ DiagnosisID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from Diagnosis WHERE DiagnosisID = ${DiagnosisID}`,
      (error, Diagnosis) => {
        error && reject(error);
        return resolve(Diagnosis);
      }
    );
  });
};

module.exports = GetDiagnosisDataByIDPromise;
