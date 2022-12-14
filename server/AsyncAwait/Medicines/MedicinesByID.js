// import db connection
const connection = require("../../db/connection");

// Get Medicine By ID
const MedicinesByIDPromise = ({ PatientID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT Medicines.Name, ReleasedMedicines.Quantity, ReleasedMedicines.ReleasedDate,  Medicines.ExpiryDate
      FROM Medicines
      INNER JOIN ReleasedMedicines
      ON Medicines.MedicineID = ReleasedMedicines.MedicineID
      WHERE PatientID = ${PatientID} ORDER BY ReleasedMedicines.ReleasedDate DESC`,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = MedicinesByIDPromise;
