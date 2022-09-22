// import db connection
const connection = require("../../db/connection");

// Update Users Promise By ID
const UpdatePatientsPromiseByID = ({ PatientID, Address, Phone }) => {
  return new Promise((resolve, reject) => {
    const updateData = `UPDATE Patients SET Address = '${Address}', Phone='${Phone}' WHERE PatientID = ${PatientID}`;
    connection.query(updateData, (error, UsersByID) => {
      error && reject(error);
      return resolve(UsersByID);
    });
  });
};

module.exports = UpdatePatientsPromiseByID;
