require("dotenv").config();

const mysql = require("mysql2");

var db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "tennisapp",
});

db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

module.exports = db;
