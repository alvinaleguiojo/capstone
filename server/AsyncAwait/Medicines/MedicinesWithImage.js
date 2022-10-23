// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetAllMedicinesWithImagePromise = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Medicines INNER JOIN Images ON Medicines.ImageID=Images.ImageID`;
    connection.query(query, (error, Medicines) => {
      error && reject(error);
      return resolve(Medicines);
    });
  });
};

module.exports = GetAllMedicinesWithImagePromise;
