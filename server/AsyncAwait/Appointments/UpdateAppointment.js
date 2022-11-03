// import db connection
const connection = require("../../db/connection");

// Update Patient Status Promise By ID
const UpdateAppointmentPromiseByID = ({ AppointmentID, Status }) => {
  return new Promise((resolve, reject) => {
    const updateData = `UPDATE Appointments SET Status = '${Status}' WHERE AppointmentID = ${AppointmentID}`;
    connection.query(updateData, (error, StatusUpdated) => {
      error && reject(error);
      return resolve(StatusUpdated);
    });
  });
};

module.exports = UpdateAppointmentPromiseByID;
