// import db connection
const connection = require("../../db/connection");

// get medicine info with Image
const RetrieveMedicinesByIDPromise = ({ MedicineID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from Medicines INNER JOIN Images
      ON Medicines.ImageID = Images.ImageID WHERE MedicineID = ${MedicineID}`,
      (error, Medicine) => {
        error && reject(error);
        return resolve(Medicine);
      }
    );
  });
};

module.exports = RetrieveMedicinesByIDPromise;
