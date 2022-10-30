// import db connection
const connection = require("../../db/connection");

// Get Medicine By ID
const MedicinesByDateIDPromise = ({ PatientID, StartDate, EndDate }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT Medicines.Name, ReleasedMedicines.Quantity, ReleasedMedicines.ReleasedDate,  Medicines.ExpiryDate
      FROM Medicines
      INNER JOIN ReleasedMedicines
      ON Medicines.MedicineID = ReleasedMedicines.MedicineID
      WHERE PatientID = ${PatientID} AND ReleasedMedicines.ReleasedDate >= '${StartDate}' AND ReleasedMedicines.ReleasedDate <='${EndDate}' ORDER BY ReleasedMedicines.ReleasedDate DESC`,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = MedicinesByDateIDPromise;
