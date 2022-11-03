// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const CreateUserPromise = ({
  LastName,
  FirstName,
  Email,
  Password,
  Role,
  Status,
}) => {
  const newUser = `INSERT INTO Staff (LastName, FirstName, Email, Password, Role,Status ) VALUES ('${LastName}', '${FirstName}','${Email}', '${Password}', '${Role}', ${Status})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    });
  });
};

module.exports = CreateUserPromise;
