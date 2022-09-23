// import db connection
const connection = require("../../db/connection");

// Adding history for the patient records
const AddPatientHistoryPromise = ({
  PatientID,
  MedicineIntake,
  Allergies,
  Measles,
  Immunization,
  Tuberculosis,
}) => {
  const newUser = `INSERT INTO PatientHistory (PatientID, MedicineIntake, Allergies, Measles, Immunization, Tuberculosis ) VALUES ('${PatientID}', '${MedicineIntake}','${Allergies}', ${Measles}, ${Immunization}, ${Tuberculosis})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, PatientHistory) => {
      error && reject(error);
      return resolve(PatientHistory);
    });
  });
};

module.exports = AddPatientHistoryPromise;
