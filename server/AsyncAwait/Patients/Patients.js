// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetAllPatientsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Patients ", (error, Patients) => {
      error && reject(error);
      return resolve(Patients);
    });
  });
};

module.exports = GetAllPatientsPromise;
