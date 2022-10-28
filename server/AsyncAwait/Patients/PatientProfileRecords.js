// import db connection
const connection = require("../../db/connection");

// Get All Patients Profile Records
const PatientProfileRecordsPromise = (PatientID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT Appointments.AppointmentID, Appointments.PatientID, Appointments.Schedule, Services.ServiceType , Appointments.Status FROM Appointments INNER JOIN Services ON Appointments.ServiceID=Services.ServiceID Where PatientID = ${PatientID} ORDER BY CreatedDate DESC`;
    connection.query(query, (error, PatientRecords) => {
      error && reject(error);
      return resolve(PatientRecords);
    });
  });
};

module.exports = PatientProfileRecordsPromise;
