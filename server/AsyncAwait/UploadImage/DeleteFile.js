// import db connection
const connection = require("../../db/connection");

// Delete File
const DeleteFileByIDPromise = ({ deleteFile }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM Images WHERE Image = '${deleteFile}'`,
      (error, DeletedFile) => {
        error && reject(error);
        return resolve(DeletedFile);
      }
    );
  });
};

module.exports = DeleteFileByIDPromise;
