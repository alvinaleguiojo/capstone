// import db connection
const connection = require("../../db/connection");

// DELETE User By ID
const DeleteUsersPromiseByID = ({ id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM Staff WHERE StaffID= ${id}`,
      (error, UsersByID) => {
        error && reject(error);
        return resolve(UsersByID);
      }
    );
  });
};

module.exports = DeleteUsersPromiseByID;
