// import db connection
const connection = require("../../db/connection");

// Get Medicine Stocks By ID and Date
const UpdateStocksExpiryDatePromise = ({
  MedicineID,
  NewStocks,
  ExpiryDate,
}) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Medicines SET Stocks = ${NewStocks}, ExpiryDate='${ExpiryDate}' WHERE MedicineID = ${MedicineID}; `,
      (error, Medicines) => {
        error && reject(error);
        return resolve(Medicines);
      }
    );
  });
};

module.exports = UpdateStocksExpiryDatePromise;
