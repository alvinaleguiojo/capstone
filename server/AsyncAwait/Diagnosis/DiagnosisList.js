// import db connection
const connection = require("../../db/connection");

// Get All Medicines
const GetAllDiagnosisPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Diagnosis ", (error, Diagnosis) => {
      error && reject(error);
      return resolve(Diagnosis);
    });
  });
};

module.exports = GetAllDiagnosisPromise;
