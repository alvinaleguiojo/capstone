// import db connection
const connection = require("../../db/connection");

// Released Medicine
const ReleasedMedicinePromise = ({
  Quantity,
  PatientID,
  MedicineID,
  ReleasedDate,
  Note
}) => {
  const newUser = `INSERT INTO ReleasedMedicines (Quantity, PatientID, MedicineID, Note, ReleasedDate ) VALUES (${Quantity}, ${PatientID}, ${MedicineID}, '${Note}', '${ReleasedDate}')`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, ReleasedMedicine) => {
      error && reject(error);
      return resolve(ReleasedMedicine);
    });
  });
};

module.exports = ReleasedMedicinePromise;
