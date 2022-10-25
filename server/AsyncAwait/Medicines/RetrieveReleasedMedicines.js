// import db connection
const connection = require("../../db/connection");

// get all released medicines with pagination
const RetrieveReleasedMedicinesByIDPromise = ({ limit, offset, LIKE }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ReleasedMedicines.ReleasedID, Patients.PatientID, Medicines.MedicineID, Patients.FirstName, Patients.LastName , Medicines.Name, ReleasedMedicines.Quantity , ReleasedMedicines.ReleasedDate , Images.Image
      FROM ReleasedMedicines
      INNER JOIN Medicines
      ON Medicines.MedicineID = ReleasedMedicines.MedicineID
      INNER JOIN Images
      ON Images.ImageID = Medicines.ImageID
      INNER JOIN Patients
      ON Patients.PatientID = ReleasedMedicines.PatientID WHERE Medicines.Name LIKE '%${LIKE}%' OR Patients.FirstName LIKE '%${LIKE}%' OR Patients.LastName LIKE '%${LIKE}%' limit ${limit} OFFSET ${offset}`,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = RetrieveReleasedMedicinesByIDPromise;
