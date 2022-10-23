// import db connection
const connection = require("../../db/connection");

// Count the total document in Patients table
const CountDocumentsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(MedicineID) AS NumberOfPatients FROM Medicines`,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = CountDocumentsPromise;
