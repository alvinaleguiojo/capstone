// import db connection
const connection = require("../../db/connection");

// Adding Service
const AddServicePromise = ({ ServiceType, Availability, Description }) => {
  const newService = `INSERT INTO Services (ServiceType, Availability, Description) VALUES ('${ServiceType}', ${Availability}, '${Description}')`;
  return new Promise((resolve, reject) => {
    connection.query(newService, (error, newCreatedService) => {
      error && reject(error);
      return resolve(newCreatedService);
    });
  });
};

module.exports = AddServicePromise;
