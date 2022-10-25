// import db connection
const connection = require("../../db/connection");

// Count the total document in released medicines
const ReleasedMedicinesCountDocumentsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(ReleasedID) AS NumberOfRequestedMedicines FROM ReleasedMedicines`,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = ReleasedMedicinesCountDocumentsPromise;
