// import db connection
const connection = require("../../db/connection");

// Get All Patients Limit

// INNER JOIN Images ON Patients.ImageID=Images.ImageID
const GetMedicinesLimitPromise = ({ limit, offset, LIKE }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Medicines INNER JOIN Images ON Medicines.ImageID=Images.ImageID WHERE Name LIKE '%${LIKE}%' limit ${limit} OFFSET ${offset}`,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = GetMedicinesLimitPromise;
