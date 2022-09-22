// import db connection
const connection = require("../../db/connection");

// To check if the User Email is exist and return a Promise
const UserCredentialPromise = (Email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Staff where Email = '${Email}'`,
      (error, UserEmail) => {
        error && reject(error);
        return resolve(UserEmail);
      }
    );
  });
};

module.exports = UserCredentialPromise;
