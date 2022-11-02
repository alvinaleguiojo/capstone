// import db connection
const connection = require("../../db/connection");

// Create new Diagnosis
const CreateDiagnosisPromise = ({
  PatientID,
  StaffID,
  CurrentDate,
  Diagnose,
  Notes
}) => {
  const newDiagnosis = `INSERT INTO Diagnosis (Diagnose, StaffID, Date, PatientID, Notes) VALUES ('${Diagnose}', ${StaffID}, '${CurrentDate}', ${PatientID}, '${Notes}')`;
  return new Promise((resolve, reject) => {
    connection.query(newDiagnosis, (error, Diagnosis) => {
      error && reject(error);
      return resolve(Diagnosis);
    });
  });
};

module.exports = CreateDiagnosisPromise;
