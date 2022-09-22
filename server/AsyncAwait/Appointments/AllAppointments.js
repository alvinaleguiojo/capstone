// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetAllAppointmentsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Appointments ", (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = GetAllAppointmentsPromise;
