// import db connection
const connection = require("../../db/connection");

// Search all data from database
const SearchDataPromise = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM capstone.Appointments WHERE (CONVERT(AppointmentID USING utf8) LIKE '%${search}%' OR CONVERT(PatientID USING utf8) LIKE '%${search}%' OR CONVERT(Schedule USING utf8) LIKE '%${search}%' OR CONVERT(ServiceID USING utf8) LIKE '%${search}%' OR CONVERT(Status USING utf8) LIKE '%${search}%' OR CONVERT(CreatedDate USING utf8) LIKE '%alvs%' OR CONVERT(Notes USING utf8) LIKE '%${search}%' OR CONVERT(IsAllDay USING utf8) LIKE '%${search}%')`, (error, Data) => {
      error && reject(error);
      return resolve(Data);
    });
  });
};

module.exports = SearchDataPromise;
