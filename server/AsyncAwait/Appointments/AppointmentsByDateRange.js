// import db connection
const connection = require("../../db/connection");

// Get All Patients
const SelectAppointmentsByDateRange = ({ StartDate, EndDate }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      ` SELECT Patients.FirstName, Patients.LastName, Services.ServiceType, Appointments.AppointmentID, Appointments.Status , Appointments.Schedule FROM Patients INNER JOIN Appointments ON Patients.PatientID = Appointments.PatientID INNER JOIN Services ON Appointments.ServiceID = Services.ServiceID  WHERE Schedule BETWEEN '${StartDate}' AND '${EndDate}' ORDER BY Schedule DESC`,
      (error, Appointments) => {
        error && reject(error);
        return resolve(Appointments);
      }
    );
  });
};

module.exports = SelectAppointmentsByDateRange;
