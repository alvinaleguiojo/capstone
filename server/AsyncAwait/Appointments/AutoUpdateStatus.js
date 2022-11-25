// import db connection
const connection = require("../../db/connection");

// Update Patient Status Promise By ID
const AutoUpdateStatusPromiseByID = ({ today, Status }) => {
  return new Promise((resolve, reject) => {
    const updateData = `UPDATE Appointments SET Status = '${Status}' WHERE Schedule < '${today}' AND Status !="Completed"`;
    connection.query(updateData, (error, StatusUpdated) => {
      error && reject(error);
      return resolve(StatusUpdated);
    });
  });
};

module.exports = AutoUpdateStatusPromiseByID;
