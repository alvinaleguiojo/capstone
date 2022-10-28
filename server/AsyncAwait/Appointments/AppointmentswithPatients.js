// import db connection
const connection = require("../../db/connection");

// Get All AppointmentsPatients
const GetAllAppointmentswithPatientsPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Appointments INNER JOIN Patients ON Patients.PatientID = Appointments.PatientID", (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = GetAllAppointmentswithPatientsPromise;
