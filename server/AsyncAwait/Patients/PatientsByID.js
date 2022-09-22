// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetPatientsByIDPromise = (PatientID) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Patients WHERE PatientID = ${PatientID}`, (error, Patients) => {
      error && reject(error);
      return resolve(Patients);
    });
  });
};

module.exports = GetPatientsByIDPromise;
