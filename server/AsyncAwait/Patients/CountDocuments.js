// import db connection
const connection = require("../../db/connection");

// Count the total document in Patients table
const CountDocumentsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(PatientID) AS NumberOfPatients FROM Patients`,
      (error, Patients) => {
        error && reject(error);
        return resolve(Patients);
      }
    );
  });
};

module.exports = CountDocumentsPromise;
