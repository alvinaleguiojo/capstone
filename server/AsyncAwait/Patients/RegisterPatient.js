// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const RegisterPatientPromise = ({
  LastName,
  FirstName,
  Age,
  Gender,
  Address,
  Phone,
  CreatedDate,
}) => {
  const newUser = `INSERT INTO Patients (LastName, FirstName, Age, Gender, Address, Phone , CreatedDate ) VALUES ('${LastName}', '${FirstName}','${Age}', '${Gender}', '${Address}', ${Phone}, '${CreatedDate}')`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    }); 
  });
};

module.exports = RegisterPatientPromise;
