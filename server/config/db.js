require("dotenv").config();

const mysql = require("mysql2");

let DATABASE = process.env.NODE_ENV === "test" ? "test_tennisapp" : "tennisapp";

var db = mysql.createPool({
  connectionLimit: 50,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = db;
