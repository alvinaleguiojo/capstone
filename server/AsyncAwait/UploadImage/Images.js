// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetAllImagesPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Images ", (error, Images) => {
      error && reject(error);
      return resolve(Images);
    });
  });
};

module.exports = GetAllImagesPromise;
