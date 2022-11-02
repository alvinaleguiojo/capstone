// import db connection
const connection = require("../../db/connection");

// Create new Notifications
const NewNotificationPromise = ({
  StaffID,
  Type,
  Route,
  Unread,
  Description
}) => {
  const newDiagnosis = `INSERT INTO Notifications (StaffID, Type, Route, Unread, Description) VALUES (${StaffID}, '${Type}', '${Route}', ${Unread}, '${Description}')`;
  return new Promise((resolve, reject) => {
    connection.query(newDiagnosis, (error, Diagnosis) => {
      error && reject(error);
      return resolve(Diagnosis);
    });
  });
};

module.exports = NewNotificationPromise;
