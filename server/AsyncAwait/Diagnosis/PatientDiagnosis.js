// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetDiagnosisByIDPromise = ({ PatientID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from Diagnosis WHERE PatientID = ${PatientID}`,
      (error, Diagnosis) => {
        error && reject(error);
        return resolve(Diagnosis);
      }
    );
  });
};

module.exports = GetDiagnosisByIDPromise;
