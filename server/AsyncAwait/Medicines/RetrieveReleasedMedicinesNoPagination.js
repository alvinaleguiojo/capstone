// import db connection
const connection = require("../../db/connection");

// get all released medicines without pagination
const RetrieveReleasedMedicinesNoPagition = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `Select Medicines.MedicineID, Images.Image, Medicines.Name, Patients.PatientID, Patients.FirstName, Patients.LastName, ReleasedMedicines.Quantity, ReleasedMedicines.ReleasedDate FROM Medicines INNER JOIN ReleasedMedicines on ReleasedMedicines.MedicineID = Medicines.MedicineID INNER JOIN Patients on ReleasedMedicines.PatientID = Patients.PatientID INNER join Images on Images.ImageID = Medicines.ImageID ORDER BY ReleasedDate DESC; 
      `,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};


// old query 

// Select * 
//       FROM Medicines
//       INNER JOIN ReleasedMedicines
//       on ReleasedMedicines.MedicineID = Medicines.MedicineID
//       INNER join Images
//       on Images.ImageID = Medicines.ImageID ORDER BY ReleasedDate DESC

module.exports = RetrieveReleasedMedicinesNoPagition;
