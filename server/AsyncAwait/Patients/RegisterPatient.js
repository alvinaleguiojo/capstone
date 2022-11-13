// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const RegisterPatientPromise = ({
  LastName,
  FirstName,
  MiddleName,
  Suffix,
  Phone,
  BirthDate,
  Gender,
  Street,
  Baranggay,
  City,
  ImageID
}) => {
  const newUser = `INSERT INTO Patients (LastName, FirstName, MiddleName, Suffix, Phone , BirthDate, Gender, Street, Baranggay, City, ImageID ) VALUES ('${LastName}', '${FirstName}', '${MiddleName}', '${Suffix}', '${Phone}', '${BirthDate}', '${Gender}', '${Street}', '${Baranggay}', '${City}', ${ImageID})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    });
  });
};

module.exports = RegisterPatientPromise;
