// import db connection
const connection = require("../../db/connection");

// Remove Appointment from the list
const RemoveAppointmentByIDPromise = ({ AppointmentID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM Appointments WHERE AppointmentID = ${AppointmentID}`,
      (error, DeletedAppointment) => {
        error && reject(error);
        return resolve(DeletedAppointment);
      }
    );
  });
};

module.exports = RemoveAppointmentByIDPromise;
