// import db connection
const connection = require("../../db/connection");

// Get All Patients
const DashboardAppointmentsPromise = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const query = `SELECT Patients.FirstName, Patients.LastName, Services.ServiceType, Appointments.AppointmentID, Appointments.Status FROM Patients INNER JOIN Appointments ON Patients.PatientID = Appointments.PatientID INNER JOIN Services ON Appointments.ServiceID = Services.ServiceID Where Appointments.Schedule = ${date}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = DashboardAppointmentsPromise;
