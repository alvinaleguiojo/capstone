// import db connection
const connection = require("../../db/connection");

// Update Users Promise By ID
const UpdateUsersPromiseByID = (ID, Role, Verified) => {
  return new Promise((resolve, reject) => {
    const updateData = `UPDATE Staff SET Role = '${Role}', Verified=${Verified} WHERE StaffID = ${ID}`;
    connection.query(updateData, (error, UsersByID) => {
      error && reject(error);
      return resolve(UsersByID);
    });
  });
};

module.exports = UpdateUsersPromiseByID;
