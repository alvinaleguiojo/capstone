// import db connection
const connection = require("../../db/connection");

// Adding Service
const AddServicePromise = ({ ServiceType, Availability, Description, Color }) => {
  const newService = `INSERT INTO Services (ServiceType, Availability, Description , Color) VALUES ('${ServiceType}', ${Availability}, '${Description}', '${Color}')`;
  return new Promise((resolve, reject) => {
    connection.query(newService, (error, newCreatedService) => {
      error && reject(error);
      return resolve(newCreatedService);
    });
  });
};

module.exports = AddServicePromise;
