// import db connection
const connection = require("../../db/connection");
const moment = require("moment");

// Get All Patients
const DashboardAppointmentsPromise = () => {
  const today = new Date();
  // today.setDate(today.getDate() + 1);
  // ✅ 31 Day added
  // console.log(date);
  const date = moment(today).format("YYYY-MM-DD");

  // setting the date tomorrow because in the server need + 1 day
  // const tomorrow = moment().add(1, 'days').calendar();
  // const date = moment(tomorrow).format("YYYY-MM-DD")

  const query = `SELECT Patients.PatientID, Patients.FirstName, Patients.LastName, Services.ServiceType, Appointments.AppointmentID, Appointments.Status, Services.Color FROM Patients INNER JOIN Appointments ON Patients.PatientID = Appointments.PatientID INNER JOIN Services ON Appointments.ServiceID = Services.ServiceID WHERE Schedule = '${date}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = DashboardAppointmentsPromise;
