// import db connection
const connection = require("../../db/connection");

// Get All Patients
const GetAllPatientsWithImagePromise = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Patients INNER JOIN Images ON Patients.ImageID=Images.ImageID`;
    connection.query(query, (error, Patients) => {
      error && reject(error);
      return resolve(Patients);
    });
  });
};

module.exports = GetAllPatientsWithImagePromise;
