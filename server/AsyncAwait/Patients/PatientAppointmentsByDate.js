// import db connection
const connection = require("../../db/connection");

// Get All Patients Appointments filter by Date
const PatientAppointmentByDatePromise = ({ PatientID, StartDate, EndDate }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT Appointments.AppointmentID, Appointments.PatientID, Appointments.Schedule, Services.ServiceType , Appointments.Status FROM Appointments INNER JOIN Services ON Appointments.ServiceID=Services.ServiceID Where PatientID = ${PatientID} AND Appointments.Schedule BETWEEN '${StartDate}' AND '${EndDate}'`;
    connection.query(query, (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = PatientAppointmentByDatePromise;
