// import db connection
const connection = require("../../db/connection");

// Adding Appointment for the patient
const AddServicePromise = ({ ServiceType, Availability }) => {
  const newUser = `INSERT INTO Services (ServiceType, Availability) VALUES ('${ServiceType}', ${Availability})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    });
  });
};

module.exports = AddServicePromise;
