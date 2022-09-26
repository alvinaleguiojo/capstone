// import db connection
const connection = require("../../db/connection");

// Get All Patients Limit

// INNER JOIN Images ON Patients.ImageID=Images.ImageID
const GetAllPatientsLimitPromise = ({ limit, offset, LIKE }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Patients INNER JOIN Images ON Patients.ImageID=Images.ImageID WHERE FirstName LIKE '%${LIKE}%' OR LastName LIKE '%${LIKE}%' OR Street LIKE '%${LIKE}%' OR Baranggay LIKE '%${LIKE}%' OR City LIKE '%${LIKE}%' limit ${limit} OFFSET ${offset}`,
      (error, Patients) => {
        error && reject(error);
        return resolve(Patients);
      }
    );
  });
};

module.exports = GetAllPatientsLimitPromise;
