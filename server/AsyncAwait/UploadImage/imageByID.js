// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetImageByIDPromise = (ImageID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Images WHERE ImageID = ${ImageID}`,
      (error, Images) => {
        error && reject(error);
        return resolve(Images);
      }
    );
  });
};

module.exports = GetImageByIDPromise;
