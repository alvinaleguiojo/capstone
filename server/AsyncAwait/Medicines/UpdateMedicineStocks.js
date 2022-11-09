// import db connection
const connection = require("../../db/connection");

// Get Medicine Stocks By ID
const UpdateStocksPromise = ({ MedicineID, NewStocks }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Medicines SET Stocks = ${NewStocks} WHERE MedicineID = ${MedicineID}; `,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = UpdateStocksPromise;
