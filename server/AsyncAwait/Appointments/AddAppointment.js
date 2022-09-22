// import db connection
const connection = require("../../db/connection");

// Adding Appointment for the patient
const AddAppointmentPromise = ({
  PatientID,
  Schedule,
  ServiceID,
  Status,
  CreatedDate,
}) => {
  const newUser = `INSERT INTO Appointments (PatientID, Schedule, ServiceID, Status, CreatedDate ) VALUES ('${PatientID}', '${Schedule}','${ServiceID}', '${Status}', '${CreatedDate}')`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, Appointments) => {
      error && reject(error);
      return resolve(Appointments);
    });
  });
};

module.exports = AddAppointmentPromise;
