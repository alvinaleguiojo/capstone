// import db connection
const connection = require("../../db/connection");

// Get All Patients
const DeleteServicesByIDPromise = ({ ServiceID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM Services WHERE ServiceID = ${ServiceID}`,
      (error, DeletedService) => {
        error && reject(error);
        return resolve(DeletedService);
      }
    );
  });
};

module.exports = DeleteServicesByIDPromise;
