const mysql = require("mysql2");
require("dotenv").config();

//db initialization with MYSQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.DB_PORT,
});

module.exports = connection;