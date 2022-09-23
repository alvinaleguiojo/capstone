// import db connection
const connection = require("../../db/connection");

// Uplaoding Image
const UploadImagePromise = ({ Image }) => {
  const newUser = `INSERT INTO Images (Image) VALUES ('${Image}')`;
  return new Promise((resolve, reject) => {
    connection.query(newUser, (error, UploadImage) => {
      error && reject(error);
      return resolve(UploadImage);
    });
  });
};

module.exports = UploadImagePromise;
