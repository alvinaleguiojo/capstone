// import db connection
const connection = require("../../db/connection");

// Get All Medicines
const GetAllMedicinesPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Medicines ", (error, Medicines) => {
      error && reject(error);
      return resolve(Medicines);
    });
  });
};

module.exports = GetAllMedicinesPromise;
