// import db connection
const connection = require("../../db/connection");

// Create User || Register User
const RegisterMedicinePromise = ({
  Name,
  Stocks,
  Unit,
  Size,
  ExpiryDate,
  Manufacturer,
  Dosage,
  Description,
  Availability,
  ImageID,
}) => {
  const newUser = `INSERT INTO Medicines (Name, Stocks, Unit, Size, ExpiryDate , Manufacturer, Dosage, Description,  Availability, ImageID) VALUES ('${Name}', ${Stocks}, '${Unit}', ${Size}, '${ExpiryDate}', '${Manufacturer}', '${Dosage}', '${Description}', ${Availability}, ${ImageID})`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, newCreatedMedicine) => {
      error && reject(error);
      return resolve(newCreatedMedicine);
    });
  });
};

module.exports = RegisterMedicinePromise;
