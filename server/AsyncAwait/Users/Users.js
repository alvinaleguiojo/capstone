// import db connection
const connection = require("../../db/connection");

// Get All Users
const GetAllUsersPromise = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Users ", (error, Users) => {
      error && reject(error);
      return resolve(Users);
    });
  });
};

module.exports = GetAllUsersPromise;
