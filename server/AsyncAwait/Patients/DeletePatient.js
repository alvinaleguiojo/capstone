// import db connection
const connection = require("../../db/connection");

// Get All Patients
const DeletePatientsByIDPromise = ({ PatientID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM Patients WHERE PatientID = ${PatientID}`,
      (error, DeletedPatient) => {
        error && reject(error);
        return resolve(DeletedPatient);
      }
    );
  });
};

module.exports = DeletePatientsByIDPromise;
