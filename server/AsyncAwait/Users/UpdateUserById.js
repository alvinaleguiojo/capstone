// import db connection
const connection = require("../../db/connection");

// Update Users Promise By ID
const UpdateUsersPromiseByID = (ID, Address, Phone, Role) => {
  return new Promise((resolve, reject) => {
    const updateData = `UPDATE Users SET Address = '${Address}', Phone = '${Phone}', Role = '${Role}' WHERE ID = ${ID}`;
    connection.query(updateData, (error, UsersByID) => {
      error && reject(error);
      return resolve(UsersByID);
    });
  });
};

module.exports = UpdateUsersPromiseByID;
