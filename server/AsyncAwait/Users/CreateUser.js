// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const CreateUserPromise = ({
  LastName,
  FirstName,
  Email,
  Password,
  Role,
  Verified,
  CreatedDate,
}) => {
  const newUser = `INSERT INTO Staff (LastName, FirstName, Email, Password, Role, Verified , CreatedDate ) VALUES ('${LastName}', '${FirstName}','${Email}', '${Password}', '${Role}', ${Verified}, '${CreatedDate}')`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    });
  });
};

module.exports = CreateUserPromise;
