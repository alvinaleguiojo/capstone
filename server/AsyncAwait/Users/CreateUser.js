// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const CreateUserPromise = ({
  LastName,
  FirstName,
  Email,
  Password,
  Role,
  CreatedDate,
  Status
}) => {
  const newUser = `INSERT INTO Staff (LastName, FirstName, Email, Password, Role, CreatedDate, Status ) VALUES ('${LastName}', '${FirstName}','${Email}', '${Password}', '${Role}','${CreatedDate}', ${Status})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    });
  });
};

module.exports = CreateUserPromise;
