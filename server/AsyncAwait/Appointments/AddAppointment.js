// import db connection
const connection = require("../../db/connection");

// Adding Appointment for the patient
const AddAppointmentPromise = ({
  PatientID,
  Schedule,
  ServiceID,
  Status,
  Notes,
  CreatedDate,
  isAllDay,
}) => {
  const newUser = `INSERT INTO Appointments (PatientID, Schedule, ServiceID, Status, Notes, CreatedDate, isAllDay ) VALUES ('${PatientID}', '${Schedule}','${ServiceID}', '${Status}', '${Notes}', '${CreatedDate}', ${isAllDay})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = AddAppointmentPromise;
