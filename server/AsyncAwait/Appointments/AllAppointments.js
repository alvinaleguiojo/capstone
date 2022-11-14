// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetAllAppointmentsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Appointments ORDER BY Schedule DESC", (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = GetAllAppointmentsPromise;
