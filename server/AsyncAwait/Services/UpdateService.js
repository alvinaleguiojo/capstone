// import db connection
const connection = require("../../db/connection");

// Update Service Promise By ID
const UpdateServicesPromiseByID = ({
  ServiceID,
  Availability,
  ServiceType,
}) => {
  const value = Availability ? 1 : 0;
  return new Promise((resolve, reject) => {
    const updateData = `UPDATE Services SET Availability = '${value}', ServiceType='${ServiceType}'  WHERE ServiceID = ${ServiceID}`;
    connection.query(updateData, (error, UpdatedService) => {
      error && reject(error);
      return resolve(UpdatedService);
    });
  });
};

module.exports = UpdateServicesPromiseByID;
