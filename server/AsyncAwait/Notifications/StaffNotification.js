// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetNotificationByIDPromise = ({ StaffID }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from Notifications WHERE StaffID = ${StaffID}`,
      (error, Diagnosis) => {
        error && reject(error);
        return resolve(Diagnosis);
      }
    );
  });
};

module.exports = GetNotificationByIDPromise;
