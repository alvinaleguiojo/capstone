// import db connection
const connection = require("../../db/connection");

// Get All Services
const GetAllServicesEnabledPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Services WHERE Availability=true",
      (error, Services) => {
        error && reject(error);
        return resolve(Services);
      }
    );
  });
};

module.exports = GetAllServicesEnabledPromise;
