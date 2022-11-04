// import db connection
const connection = require("../../db/connection");

// Get All Patients
const DashboardAppointmentsPromise = () => {
  const today = new Date();
  today.setDate(today.getDate() + 30);
  const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  // ✅ 31 Day added
  console.log(date);

  const query = `SELECT Patients.PatientID, Patients.FirstName, Patients.LastName, Services.ServiceType, Appointments.AppointmentID, Appointments.Status, Services.Color FROM Patients INNER JOIN Appointments ON Patients.PatientID = Appointments.PatientID INNER JOIN Services ON Appointments.ServiceID = Services.ServiceID WHERE Schedule = '${date}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = DashboardAppointmentsPromise;
