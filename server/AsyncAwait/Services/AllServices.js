// import db connection
const connection = require("../../db/connection");

// Get All Services
const GetAllServicesPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Services ", (error, Services) => {
      error && reject(error);
      return resolve(Services);
    });
  });
};

module.exports = GetAllServicesPromise;
