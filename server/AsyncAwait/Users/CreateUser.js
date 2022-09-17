// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const CreateUserPromise = ({
  LastName,
  FirstName,
  Address,
  Email,
  Password,
  Role,
  Created_Date,
  Verified,
}) => {
  const newUser = `INSERT INTO Users (LastName, FirstName, Address, Email, Password, Role , Created_Date, Verified) VALUES (${LastName}, ${FirstName}, ${Address}, ${Email}, ${Password}, ${Role}, ${Created_Date}, ${Verified})`;
  return new Promise((resolve, reject) => {
    error && reject(error);
    connection.query(newUser, (error, newCreatedUser) => {
      error && reject(error);
      return resolve(newCreatedUser);
    });
  });
};

module.exports = CreateUserPromise;
