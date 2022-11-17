// import db connection
const connection = require("../../db/connection");

// Get Patient By ID
const GetPatientHistoryByIDPromise = ({ PatientID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from PatientHistory WHERE PatientID = ${PatientID}`,
      (error, History) => {
        error && reject(error);
        return resolve(History);
      }
    );
  });
};

module.exports = GetPatientHistoryByIDPromise;
