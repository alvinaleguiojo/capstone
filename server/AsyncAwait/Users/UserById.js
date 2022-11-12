// import db connection
const connection = require("../../db/connection");

// Get Users Promise By ID
const GetUsersPromiseByID = (ID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Staff where StaffID = ${ID}`,
      (error, UsersByID) => {
        error && reject(error);
        return resolve(UsersByID);
      }
    );
  });
};

module.exports = GetUsersPromiseByID;
